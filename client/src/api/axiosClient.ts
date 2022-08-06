import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import queryString from "query-string";
import axiosBase from "./axiosBase";

const axiosClient = axios.create({
  baseURL: "https://ndc-phimmoi.herokuapp.com/api/v1/",
  headers: {
    "Content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem("ACCESS_TOKEN") || "";
  if (!accessToken) return config;
  try {
    const tokenPayload = jwtDecode<JwtPayload>(accessToken);
    if (tokenPayload.exp && tokenPayload.exp <= new Date().getTime() / 1000) {
      const data = await axiosBase.post<any, any>("/auth/token");
      accessToken = data.accessToken;
      localStorage.setItem("ACCESS_TOKEN", accessToken);
    }
    if (!config.headers) throw new Error("Cant't set headers");
    config.headers.Authorization = `Bearer ${accessToken}`;
  } catch (error) {
    console.log(error);
  }
  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
