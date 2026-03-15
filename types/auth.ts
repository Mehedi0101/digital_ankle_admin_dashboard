export interface IUser {
    id: string;
    name: string;
    email: string;
    role: "admin" | "patient" | "staff";
    branch_id?: string;
}

export interface AuthState {
    user: IUser | null;
}

export interface ILoginResponse {
    success: boolean;
    message: string;
    data: {
        user: IUser;
    };
}
