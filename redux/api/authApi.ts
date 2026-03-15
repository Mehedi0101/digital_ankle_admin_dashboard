import { ILoginInput, ILoginResponse } from "@/types/auth";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILoginInput>({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation<{ success: boolean }, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
