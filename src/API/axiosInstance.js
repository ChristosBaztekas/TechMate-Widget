import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-test.techmate.gr/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;