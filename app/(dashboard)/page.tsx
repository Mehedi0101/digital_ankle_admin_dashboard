"use client";

import React from "react";
import { useAppSelector } from "@/store/hooks";
import { 
  Wand2, 
  ArrowRight, 
  Users, 
  Building2, 
  Stethoscope, 
  BriefcaseMedical 
} from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
    const user = useAppSelector((state) => state.auth.user);

    const quickLinks = [
        { name: "Manage Staff", href: "/staff", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { name: "View Branches", href: "/branches", icon: Building2, color: "text-purple-600", bg: "bg-purple-50" },
        { name: "Define Services", href: "/services", icon: Stethoscope, color: "text-emerald-600", bg: "bg-emerald-50" },
        { name: "Service Packages", href: "/packages", icon: BriefcaseMedical, color: "text-orange-600", bg: "bg-orange-50" },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-in fade-in zoom-in slide-in-from-bottom-8 duration-1000 ease-out">
            {/* Elegant Icon Container */}
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-200 group/wand transition-all duration-500 hover:rotate-3 hover:scale-110">
                <Wand2 className="text-white w-10 h-10 group-hover/wand:scale-110 transition-transform duration-500" />
            </div>

            {/* Welcome Text */}
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Welcome back, <span className="text-blue-600">{user?.name || "Admin"}</span>!
            </h1>
            <p className="text-lg text-slate-500 max-w-lg mx-auto mb-12">
                Your medical center's administrative hub is ready. Use the sidebar to manage your staff, branches, and healthcare services.
            </p>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl px-4">
                {quickLinks.map((link) => (
                    <Link 
                        key={link.name} 
                        href={link.href}
                        className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-4"
                    >
                        <div className={`p-4 rounded-xl ${link.bg} group-hover:scale-110 transition-transform`}>
                            <link.icon className={`w-8 h-8 ${link.color}`} />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-slate-900">{link.name}</span>
                            <div className="flex items-center gap-1 text-xs text-blue-600 mt-2 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                Get Started <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Footer Note */}
            <div className="mt-16 pt-8 border-t border-slate-100 w-full max-w-xs">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                    Digital Ankle Systems v1.0.0
                </p>
            </div>
        </div>
    );
}
