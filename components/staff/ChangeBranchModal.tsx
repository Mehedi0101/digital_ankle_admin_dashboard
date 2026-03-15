"use client";

import React, { useState } from "react";
import { useGetAllBranchesQuery } from "@/redux/api/branchApi";
import { useChangeBranchMutation } from "@/redux/api/staffApi";
import { toast } from "sonner";
import { X, Loader2, User as UserIcon } from "lucide-react";

export default function ChangeBranchModal({ staff, onClose }: { staff: any, onClose: () => void }) {
    const { data: branchData, isLoading: branchesLoading } = useGetAllBranchesQuery();
    const [changeBranch, { isLoading: isUpdating }] = useChangeBranchMutation();
    const [selectedBranchId, setSelectedBranchId] = useState(staff.branch?._id || "");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await changeBranch({ staffId: staff._id, branchId: selectedBranchId }).unwrap();
            toast.success(`Successfully moved ${staff.user?.name} to new branch`);
            onClose();
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to change branch");
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">Change Branch</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Staff Information</label>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-100">
                                    <UserIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">{staff.user?.name}</p>
                                    <p className="text-xs text-slate-500">{staff.user?.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                            <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Current Assignment</label>
                            <p className="text-sm font-medium text-blue-900">{staff.branch?.branch_name || "Unassigned"}</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Assign to New Branch</label>
                        <select
                            required
                            value={selectedBranchId}
                            onChange={(e) => setSelectedBranchId(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        >
                            <option value="">Select a branch</option>
                            {branchData?.data.map((branch: any) => (
                                <option key={branch._id} value={branch._id}>{branch.branch_name} - {branch.location}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={isUpdating || !selectedBranchId}
                        className="w-full bg-blue-600 text-white rounded-xl py-3.5 font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                    >
                        {isUpdating && <Loader2 className="w-5 h-5 animate-spin" />}
                        Update Assignment
                    </button>
                </form>
            </div>
        </div>
    );
}