import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { myListApi } from "@api/myListApi";

interface MovieState {
    watchList: string[]; //id of movies in MyList
}

const initialState: MovieState = {
    watchList: [],
};

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(myListApi.getWatchList.fulfilled, (state, action) => {
            return { ...state, watchList: action.payload.watchList };
        });
        builder.addCase(myListApi.addToWatchList.fulfilled, (state, action) => {
            return { ...state, watchList: action.payload.watchList };
        });
        builder.addCase(
            myListApi.removeFromWatchList.fulfilled,
            (state, action) => {
                return { ...state, watchList: action.payload.watchList };
            }
        );
    },
});

const movieReducer = movieSlice.reducer;
export default movieReducer;
// eslint-disable-next-line no-empty-pattern
export const {} = movieSlice.actions;
export const movieSelector = (state: RootState) => state.movie;
