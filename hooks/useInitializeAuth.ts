import { useEffect } from "react";
import { useGetMeQuery } from "@/redux/api/userApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, setInitialized, logout } from "@/store/slices/authSlice";

/**
 * useInitializeAuth
 *
 * Runs ONCE on app startup to check the user's session.
 * Uses `skip: isInitialized` so the query never re-fires after the first run.
 * Sets `isInitialized = true` in Redux when the check is complete (success OR error).
 *
 * This is the single source of truth for session state.
 * AuthGuard and GuestGuard read from Redux state only — they do NOT call useGetMeQuery themselves.
 */
export function useInitializeAuth() {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector((state) => state.auth.isInitialized);

    // Skip the query once session check is done — prevents re-fetching on every render
    const { data, isSuccess, isError } = useGetMeQuery(undefined, {
        skip: isInitialized,
    });

    useEffect(() => {
        if (isSuccess && data?.success) {
            dispatch(setUser(data.data));
            dispatch(setInitialized());
        }
    }, [isSuccess, data, dispatch]);

    useEffect(() => {
        if (isError) {
            dispatch(logout()); // Sets user = null, isInitialized = true
        }
    }, [isError, dispatch]);
}
