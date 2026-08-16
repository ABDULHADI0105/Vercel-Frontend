import axios from "axios";

const API = axios.create({
  baseURL: "https://vercel-backend-production-d74f.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;