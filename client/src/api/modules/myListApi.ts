import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../axiosClient";

export const myListApi = {
    getWatchList: createAsyncThunk<any>("myList/get", async () => {
        try {
            const data = await axiosClient.get<any, any>("/user/watchList");
            return data;
        } catch (error) {
            console.log(error);
        }
    }),
    getWatchListDetails: async () => {
        try {
            const data = await axiosClient.get<any, any>(
                "/user/watchList/details"
            );
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    addToWatchList: createAsyncThunk<any, any>(
        "myList/add",
        async (_id: string) => {
            try {
                const data = await axiosClient.post<any, any>(
                    "/user/watchList",
                    { _id }
                );
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    ),
    removeFromWatchList: createAsyncThunk<any, any>(
        "myList/remove",
        async (_id: string) => {
            try {
                const data = await axiosClient.put<any, any>(
                    "/user/watchList",
                    { _id }
                );
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    ),
};
