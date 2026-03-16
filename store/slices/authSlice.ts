import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/types/auth";

interface AuthState {
    user: IUser | null;
    isInitialized: boolean; // true once the initial session check is complete
}

const initialState: AuthState = {
    user: null,
    isInitialized: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        },
        setInitialized: (state) => {
            state.isInitialized = true;
        },
        logout: (state) => {
            state.user = null;
            state.isInitialized = true; // Ensure routes can redirect after logout
        },
    },
});

export const { setUser, setInitialized, logout } = authSlice.actions;
export default authSlice.reducer;
