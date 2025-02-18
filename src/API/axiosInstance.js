import axios from "axios";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: "https://api-test.techmate.gr/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
