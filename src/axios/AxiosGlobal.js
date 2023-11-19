import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

/**
 * Custom configuration for Axios http client package. 
 * Learn more about axios at https://axios-http.com/docs/intro 
 * 
 * Here we have customized the axios API by providing custom values for
 * baseURL, header (authorization, Accept data type) etc
 */


const instance = axios.create({
  baseURL: "https://backend.e-consultation.gov.et/api/v1/",
  headers:{
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    Accept: "application/json",
    "Content-Type": "multipart/form-data"
  }
});

/**
 * Define root URL for accessing resources from the server side such as files, images and server-side generated reports
 */
export const rootURL = "https://backend.e-consultation.gov.et/api/v1/";
export default instance;
