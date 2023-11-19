import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://groupmatch.onrender.com/api",
});
