import axios, { AxiosInstance } from "axios";

// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: "http://localhost:8000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

function createAxiosInstance(port: number) {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: `http://localhost:${port}/api`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return axiosInstance
}

export default createAxiosInstance;