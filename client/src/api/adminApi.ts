import {
  GetActorsResponse,
  GetCountriesResponse,
  GetDirectorsResponse,
  GetGenresResponse,
  Movie,
  Person,
} from "../interface";
import axiosClient from "./axiosClient";

//Movie api
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

export const getAllMovies = async () => {
  try {
    const data = await axiosClient.get<any, any>("/movie");
    return data;
  } catch (error) {
    console.log(error);
  }
};

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
};

//Person api
export const postPerson = async (person: Person) => {
  try {
    const data = await axiosClient.post<any, any>("/person", person);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPeople = async () => {
  try {
    const [data1, data2] = await Promise.all([
      axiosClient.get<any, any>("/person/directors"),
      axiosClient.get<any, any>("/person/actors"),
    ]);
    return { directorsData: data1, actorsData: data2 };
  } catch (error) {
    console.log(error);
  }
};

export const putPerson = async (person: Person) => {
  try {
    const data = await axiosClient.put<any, any>("/person", person);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePerson = async (personId: string) => {
  try {
    const data = await axiosClient.delete<any, any>(`/person/${personId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//User api
export const getAllUsers = async () => {
  try {
    const data = await axiosClient.get<any, any>("/user");
    return data;
  } catch (error) {
    console.log(error);
  }
};
