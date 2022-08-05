import axiosClient from "./axiosClient";

//Rate a movie
export const rateMovie = async ({ _id, score }) => {
    try {
      const data = await axiosClient.post<any, any>("/rating/submit", {
        _id,
        score,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  
  //Get rating score of a movie by a user
  export const getUserRating = async (movieId: string) => {
    try {
      const data = await axiosClient.post<any, any>("/rating", {
        _id: movieId,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  