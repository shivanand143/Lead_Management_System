import axios from "axios";

const API = axios.create({
  baseURL: "https://lead-management-system-s6lh.onrender.com/api/",
  withCredentials: true,
});

export default API;



