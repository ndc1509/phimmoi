import axiosBase from "./axiosBase";

//Get movie filtered by type genre and paginated
export const getMoviesFiltered = async (
  type: "movie" | "tvSeries" = "movie",
  genreId: string = "all",
  limit: number = 4,
  lastId: string = ""
) => {
  try {
    const data = await axiosBase.get<any, any>(
      `/movie/${type}/${genreId}/${limit}/${lastId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Get details of a movie
export const getDetails = async (_id: string) => {
  try {
    const data = await axiosBase.get<any, any>(`/movie/details/${_id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Search movie
export const searchMovies = async (
  query: string,
  lastIds?: string[],
  lastScore?: number,
  limit: number = 4
) => {
  try {
    const data = await axiosBase.post<any, any>(`/movie/search/${query}`, {
      lastIds,
      lastScore,
      limit,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Get data to show on Homepage
export const getHomePageData = async () => {
  try {
    const data = await axiosBase.get<any, any>("/movie/home");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
