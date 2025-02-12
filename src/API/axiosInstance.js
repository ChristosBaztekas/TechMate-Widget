import axios from "axios";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;