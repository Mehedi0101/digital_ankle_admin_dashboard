// redux/api/staffApi.ts
import { baseApi } from "./baseApi";
import { IStaffResponse } from "@/types/staff";

export const staffApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addStaff: builder.mutation<{ success: boolean; message: string }, any>({
            query: (newStaff) => ({
                url: "/staffs/create-staff", // Adjust based on your backend route
                method: "POST",
                body: newStaff,
            }),
            invalidatesTags: ["Staff"],
        }),

        getAllStaff: builder.query<IStaffResponse, { page?: number; limit?: number } | void>({
            query: (params) => {
                const queryStr = params?.page ? `?page=${params.page}&limit=${params?.limit || 10}` : "";
                return `/staffs${queryStr}`;
            },
            providesTags: ["Staff"],
        }),

        changeBranch: builder.mutation<{ success: boolean; message: string }, { staffId: string; branchId: string }>({
            query: ({ staffId, branchId }) => ({
                url: `/staffs/${staffId}/change-branch`,
                method: "PATCH",
                body: { branch_id: branchId },
            }),
            invalidatesTags: ["Staff"], // Refetch staff list after change
        }),
    }),
});

export const { useGetAllStaffQuery, useChangeBranchMutation, useAddStaffMutation } = staffApi;
