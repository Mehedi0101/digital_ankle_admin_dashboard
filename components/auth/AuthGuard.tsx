"use client";

import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, isInitialized } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        // Only redirect after initialization is complete — prevents premature redirect
        if (isInitialized && !user) {
            router.replace("/login");
        }
    }, [isInitialized, user, router]);

    // 1. Not initialized yet — session check in progress
    if (!isInitialized) {
        return <AuthLoadingScreen message="Checking session..." />;
    }

    // 2. Initialized but no user — redirect in progress, show blank screen to prevent dashboard flash
    if (!user) {
        return <AuthLoadingScreen message="Redirecting to login..." />;
    }

    // 3. Authorized
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

