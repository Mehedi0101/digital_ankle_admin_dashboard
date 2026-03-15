// redux/api/branchApi.ts
import { baseApi } from "./baseApi";
import { IBranchResponse } from "@/types/staff";

export const branchApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBranches: builder.query<IBranchResponse, void>({
            query: () => "/branches",
            providesTags: ["Branch"],
        }),
    }),
});

export const { useGetAllBranchesQuery } = branchApi;
