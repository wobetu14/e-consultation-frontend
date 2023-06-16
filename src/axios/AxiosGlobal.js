import axios from "axios";

const instance = axios.create({
  baseURL: "http://196.188.107.43:8080/api/v1/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

export const rootURL = "http://196.188.107.43:8080/api/v1/";
export default instance;
