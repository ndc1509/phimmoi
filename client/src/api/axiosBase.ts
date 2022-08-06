import axios from "axios";
import queryString from "query-string";
const axiosBase = axios.create({
  baseURL: "https://ndc-phimmoi.herokuapp.com/api/v1/",
  headers: {
    "Content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: true,
});

axiosBase.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosBase;
