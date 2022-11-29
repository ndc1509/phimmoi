import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Account, ErrorResponse, NewAccount } from "@types";
import axiosBase from "../axiosBase";
import axiosClient from "../axiosClient";

export const authApi = {
    //Logout
    logout: createAsyncThunk<any>("logout", async () => {
        try {
            const data = await axiosClient.post<any, any>("/auth/logout");
            return data;
        } catch (error) {
            console.log(error);
        }
    }),
    //Reauthorize
    reauthorize: createAsyncThunk<any>("reauthorize", async (arg, thunkApi) => {
        try {
            const data = await axiosBase.post<any, any>("/auth/token");
            return data;
        } catch (error) {
            if (axios.isAxiosError(error))
                return thunkApi.rejectWithValue(
                    error.response?.data as ErrorResponse
                );
            console.log("An Unexpected Error Occurred");
        }
    }),
    //Register
    register: createAsyncThunk<any, NewAccount, { rejectValue: ErrorResponse }>(
        "register",
        async ({ username, email, password }: NewAccount, thunkApi) => {
            try {
                const data = await axiosBase.post<any, any>("/auth/register", {
                    username,
                    email,
                    password,
                });
                return data;
            } catch (error) {
                if (axios.isAxiosError(error))
                    return thunkApi.rejectWithValue(
                        error.response?.data as ErrorResponse
                    );
                console.log("An Unexpected Error Occurred");
            }
        }
    ),
    //Login
    login: createAsyncThunk<any, Account, { rejectValue: ErrorResponse }>(
        "login",
        async ({ email, password }: Account, thunkApi) => {
            try {
                const data = await axiosBase.post<any, any>("/auth/login", {
                    email,
                    password,
                });
                return data;
            } catch (error) {
                if (axios.isAxiosError(error))
                    return thunkApi.rejectWithValue(
                        error.response?.data as ErrorResponse
                    );
                console.log("An Unexpected Error Occurred");
            }
        }
    ),
};
