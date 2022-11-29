import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { authApi } from "@api/authApi";
import { User } from "@types";

export interface AuthState {
    reauthorized: boolean;
    authLoading: boolean;
    isAuthenticated: boolean;
    user: User | null;
    errorMsg: {
        login?: string;
        register?: string;
    };
}

const initialState: AuthState = {
    reauthorized: false,
    authLoading: true,
    isAuthenticated: false,
    user: null,
    errorMsg: {
        login: undefined,
        register: undefined,
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authApi.register.fulfilled, (state, action) => {
            try {
                const user = JSON.parse(localStorage.getItem("USER") || "");
                return {
                    ...state,
                    authLoading: false,
                    isAuthenticated: true,
                    user,
                    errorMsg: {
                        login: undefined,
                        register: undefined,
                    },
                };
            } catch (error) {
                console.log(error);
            }
        });
        builder.addCase(authApi.register.rejected, (state, action) => {
            return {
                ...state,
                authLoading: true,
                isAuthenticated: false,
                errorMsg: {
                    register: action.payload?.msg,
                },
            };
        });
        builder.addCase(authApi.login.fulfilled, (state, action) => {
            try {
                const user = JSON.parse(localStorage.getItem("USER") || "");
                return {
                    ...state,
                    authLoading: false,
                    isAuthenticated: true,
                    user,
                    errorMsg: {
                        login: undefined,
                        register: undefined,
                    },
                };
            } catch (error) {
                console.log(error);
            }
        });
        builder.addCase(authApi.login.rejected, (state, action) => {
            return {
                ...state,
                authLoading: true,
                isAuthenticated: false,
                errorMsg: {
                    login: action.payload?.msg,
                },
            };
        });
        builder.addCase(authApi.logout.fulfilled, (state, action) => {
            return {
                ...state,
                authLoading: true,
                isAuthenticated: false,
                user: null,
            };
        });
        builder.addCase(authApi.reauthorize.fulfilled, (state, action) => {
            try {
                const user = JSON.parse(localStorage.getItem("USER") || "");
                return {
                    ...state,
                    reauthorized: true,
                    authLoading: false,
                    isAuthenticated: true,
                    user,
                };
            } catch (error) {
                console.log(error);
            }
        });
        builder.addCase(authApi.reauthorize.rejected, (state, action) => {
            return {
                ...state,
                reauthorized: true,
            };
        });
    },
});

const authReducer = authSlice.reducer;
export default authReducer;
// eslint-disable-next-line no-empty-pattern
export const {} = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
