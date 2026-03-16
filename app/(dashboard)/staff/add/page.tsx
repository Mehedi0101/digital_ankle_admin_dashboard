"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddStaffMutation } from "@/redux/api/staffApi";
import { useGetAllBranchesQuery } from "@/redux/api/branchApi";
import { toast } from "sonner";
import { UserPlus, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddStaffPage() {
    const router = useRouter();
    const [addStaff, { isLoading }] = useAddStaffMutation();
    const { data: branchData } = useGetAllBranchesQuery();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        branchId: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addStaff(formData).unwrap();
            toast.success("New staff member created successfully");
            router.push("/staff");
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to create staff member");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4">
            <div className="w-full max-w-2xl space-y-6">
                <Link href="/staff" className="text-slate-500 hover:text-blue-600 flex items-center gap-2 text-sm font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Staff List
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                            <UserPlus className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Add New Staff</h1>
                            <p className="text-slate-500 text-sm">Create a new account for local or clinical staff.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="john@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Initial Password</label>
                                <input
                                    required
                                    type="password"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="Minimum 6 characters"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Assign Branch</label>
                                <select
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    value={formData.branchId}
                                    onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                                >
                                    <option value="">Select Branch</option>
                                    {branchData?.data.map((branch: any) => (
                                        <option key={branch._id} value={branch._id}>{branch.branch_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white rounded-xl py-3.5 font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-200"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
                            Create Staff Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
