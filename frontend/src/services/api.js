import axios from "axios";

const api = axios.create({
  baseURL: "https://aiwafruits-ecommerce.onrender.com",
  withCredentials: true,
});

export default api;