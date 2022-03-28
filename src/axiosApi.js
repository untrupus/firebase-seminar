import axios from "axios";

const axiosApi = axios.create({
  // baseURL: "https://us-central1-fir-auth-62f13.cloudfunctions.net/api",
  baseURL: "http://localhost:5001/fir-auth-62f13/us-central1/api",
});

export default axiosApi;
