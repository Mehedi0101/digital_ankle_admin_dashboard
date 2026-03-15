"use client";

import { useGetMeQuery } from "@/redux/api/userApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data, isLoading, isError, isSuccess } = useGetMeQuery();
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (data?.success) {
            dispatch(setUser(data.data));
        }
    }, [data, dispatch]);

    useEffect(() => {
        // If we are definitely not logged in, boot to login
        if (!isLoading && isError) {
            router.replace("/login");
        }
    }, [isLoading, isError, router]);

    // 1. Initial Loading (No user in brain yet)
    if (isLoading && !user) {
        return <AuthLoadingScreen message="Checking session..." />;
    }

    // 2. Not authorized/Error: Show nothing (or a separate redirected state)
    // This prevents the "split second" leak of the dashboard
    if (isError || (!isLoading && !user && !data?.success)) {
        return <AuthLoadingScreen message="Redirecting to login..." />;
    }

    // 3. Authorized (Success)
    return <>{children}</>;
}

function AuthLoadingScreen({ message }: { message: string }) {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="text-slate-500 font-medium">{message}</p>
            </div>
        </div>
    );
}
