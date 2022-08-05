import {
    GetActorsResponse,
    GetCountriesResponse,
    GetDirectorsResponse,
    GetGenresResponse,
    Movie,
    Person
} from "../interface";
import axiosClient from "./axiosClient";

export const getDataForAddingMovie = async () => {
  try {
    const data = await Promise.all([
      axiosClient.get<any, GetDirectorsResponse>("/person/directors"),
      axiosClient.get<any, GetActorsResponse>("/person/actors"),
      axiosClient.get<any, GetGenresResponse>("/genre"),
      axiosClient.get<any, GetCountriesResponse>("/country"),
    ]);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const getEveryPeople = async () => {
//   try {
//     const data = await axiosClient.get<any, any>("/person");
//     return data;
//   } catch (error) {
//     console.log(error)
//   }
// }

export const postPerson = async (person: Person) => {
  try {
    const data = await axiosClient.post<any, any>("/person", person);
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const getAllMovies =async () => {
  try {
    const data = await axiosClient.get<any, any>("/movie");
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const postMovie = async (movie: Movie) => {
  try {
    const data = await axiosClient.post<any, any>("/movie", movie);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const putMovie = async (movie: Movie) => {
  try {
    const data = await axiosClient.put<any, any>("/movie", movie);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovie = async (movieId: string) => {
  try {
    const data = await axiosClient.delete<any, any>(`/movie/${movieId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}