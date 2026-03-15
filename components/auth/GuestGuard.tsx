"use client";

import { useGetMeQuery } from "@/redux/api/userApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function GuestGuard({ children }: { children: React.ReactNode }) {
    const { data, isLoading } = useGetMeQuery();
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (data?.success) {
            dispatch(setUser(data.data));
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (user || data?.success) {
            router.replace("/");
        }
    }, [user, data, router]);

    // If user is already in state or we are actively checking the session, don't show the login form
    if (isLoading || user || data?.success) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-50">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}
