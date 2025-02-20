
import axios from "axios";

const baseUrl = import.meta.env.VITE_SERVER_URL;
const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token")|| "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjYyZDdlZTNlMmFiYTM0NTc4NTgxYiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MDAyODE4MywiZXhwIjoxNzQwMDMxNzgzfQ.jMeEbRYn7pE7qWSpaXUzKQMesCXiWZHjNnaywg0yvlA";
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;