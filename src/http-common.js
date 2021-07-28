import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/api/v1/restaurants",
  headers: {
    "Content-Type": "application/json"
  }
});

http.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export default http;
