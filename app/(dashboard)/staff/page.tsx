"use client";

import { useState } from "react";
import { useGetAllStaffQuery } from "@/redux/api/staffApi";
import { Loader2, MapPin, Mail, User as UserIcon, ChevronLeft, ChevronRight } from "lucide-react";
import ChangeBranchModal from "@/components/staff/ChangeBranchModal";

export default function StaffListPage() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching } = useGetAllStaffQuery({ page, limit: 10 });
    const [selectedStaff, setSelectedStaff] = useState<any>(null);

    if (isLoading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    const staffs = data?.data?.staffs || [];
    const pagination = data?.data?.pagination;


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Staff Members</h1>
                    <p className="text-slate-500 text-sm">Manage all clinical and administrative staff.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Staff</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Branch</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {staffs.map((staff: any) => (
                            <tr key={staff._id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                                            <UserIcon className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">{staff.user?.name || "Unknown"}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                                <Mail className="w-3 h-3" /> {staff.user?.email || "No Email"}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        {staff.branch?.branch_name || "Unassigned"}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => setSelectedStaff(staff)}
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors cursor-pointer"
                                    >
                                        Change Branch
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-end space-x-2 py-4">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page <= 1 || isFetching}
                        className="h-9 px-3 rounded-md text-sm font-medium border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-slate-500 mx-2">
                        Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= pagination.totalPages || isFetching}
                        className="h-9 px-3 rounded-md text-sm font-medium border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    >
                        Next
                    </button>
                </div>
            )}

            {selectedStaff && (
                <ChangeBranchModal
                    staff={selectedStaff}
                    onClose={() => setSelectedStaff(null)}
                />
            )}
        </div>
    );
}
