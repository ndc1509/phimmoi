import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  addToWatchList,
  getWatchList,
  removeFromWatchList,
} from "../../api/myListApi";

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
    builder.addCase(getWatchList.fulfilled, (state, action) => {
      return { ...state, watchList: action.payload.watchList };
    });
    builder.addCase(addToWatchList.fulfilled, (state, action) => {
      return { ...state, watchList: action.payload.watchList };
    });
    builder.addCase(removeFromWatchList.fulfilled, (state, action) => {
      return { ...state, watchList: action.payload.watchList };
    });
  },
});

const movieReducer = movieSlice.reducer;
export default movieReducer;
export const {} = movieSlice.actions;
export const movieSelector = (state: RootState) => state.movie;
