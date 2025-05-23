import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosMultipartHeader = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export default axiosInstance;
