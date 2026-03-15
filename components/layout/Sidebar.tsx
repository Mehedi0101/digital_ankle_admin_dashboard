"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Users,
    UserPlus,
    Building2,
    MapPin,
    PlusCircle,
    Stethoscope,
    ClipboardList,
    PlusSquare,
    Layers,
    Settings,
    User,
    Lock,
    LogOut,
    ChevronDown,
    ChevronRight,
    Loader2,
    BriefcaseMedical
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLogoutMutation } from "@/redux/api/authApi";
import { baseApi } from "@/redux/api/baseApi";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { toast } from "sonner";

const mainMenuItems = [
    {
        name: "Staff Management",
        icon: Users,
        subItems: [
            { name: "All Staff", icon: Users, href: "/staff" },
            { name: "Add New Staff", icon: UserPlus, href: "/staff/add" },
        ],
    },
    {
        name: "Branch Management",
        icon: Building2,
        subItems: [
            { name: "All Branches", icon: MapPin, href: "/branches" },
            { name: "Add New Branch", icon: PlusCircle, href: "/branches/add" },
        ],
    },
    {
        name: "Service Management",
        icon: Stethoscope,
        subItems: [
            { name: "All Services", icon: ClipboardList, href: "/services" },
            { name: "Add New Service", icon: PlusSquare, href: "/services/add" },
        ],
    },
    {
        name: "Package Management",
        icon: BriefcaseMedical,
        subItems: [
            { name: "All Packages", icon: Layers, href: "/packages" },
            { name: "Add New Package", icon: PlusCircle, href: "/packages/add" },
        ],
    },
];

const accountMenuItems = {
    name: "Account",
    icon: Settings,
    subItems: [
        { name: "My Profile", icon: User, href: "/profile" },
        { name: "Change Password", icon: Lock, href: "/profile/password" },
    ],
};

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
    const [logoutMutation, { isLoading }] = useLogoutMutation();

    const toggleMenu = (name: string) => {
        setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const handleLogout = async () => {
        try {
            await logoutMutation().unwrap();
        } catch (error) {
            // Proceed with local logout even if the backend call fails
            console.error("Logout API failed", error);
        } finally {
            dispatch(logout());
            dispatch(baseApi.util.resetApiState()); // Very important: clears RTK Query cache
            toast.success("Logged out successfully");
            router.replace("/login");
        }
    };

    const renderMenuItem = (item: any) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isOpen = openMenus[item.name];
        const isActive = pathname === item.href || item.subItems?.some((sub: any) => pathname === sub.href);

        return (
            <div key={item.name} className="space-y-1">
                {hasSubItems ? (
                    <button
                        onClick={() => toggleMenu(item.name)}
                        className={cn(
                            "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group",
                            isActive ? "text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className={cn("w-5 h-5", isActive ? "text-blue-500" : "text-slate-400 group-hover:text-white")} />
                            <span className="font-medium whitespace-nowrap text-sm">{item.name}</span>
                        </div>
                        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                ) : (
                    <Link
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                            pathname === item.href ? "bg-blue-600/10 text-blue-500 font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        )}
                    >
                        <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-blue-500" : "text-slate-400 group-hover:text-white")} />
                        <span className="font-medium whitespace-nowrap text-sm">{item.name}</span>
                    </Link>
                )}

                {hasSubItems && isOpen && (
                    <div className="ml-4 pl-4 border-l border-slate-800 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-200">
                        {item.subItems.map((sub: any) => (
                            <Link
                                key={sub.name}
                                href={sub.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group",
                                    pathname === sub.href ? "text-blue-500 font-medium" : "text-slate-500 hover:text-white"
                                )}
                            >
                                <sub.icon className={cn("w-4 h-4", pathname === sub.href ? "text-blue-500" : "text-slate-500 group-hover:text-white")} />
                                <span className="whitespace-nowrap">{sub.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-screen w-72 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0">
            <div className="p-6">
                <div className="flex flex-col items-center">
                    <img
                        src="/logo.png"
                        alt="Digital Ankle Logo"
                        className="w-24 h-10 object-contain"
                    />
                    <p className="text-slate-500 mt-2 uppercase text-xs font-bold tracking-widest text-center">Admin Dashboard</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto hidden-scrollbar">
                {/* Main Navigation */}
                {mainMenuItems.map(renderMenuItem)}
            </nav>

            <div className="p-4 border-t border-slate-800 space-y-1">
                {/* Account Section - now at bottom */}
                {renderMenuItem(accountMenuItems)}

                <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors duration-200 text-slate-400 disabled:opacity-50 mt-2"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
                    <span className="font-medium text-sm">{isLoading ? "Logging out..." : "Logout"}</span>
                </button>
            </div>
        </div>
    );
}
