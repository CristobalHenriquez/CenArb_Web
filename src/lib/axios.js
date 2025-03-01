import axios from "axios";

const api = axios.create({
  baseURL: "http://desarrollo.cenarb.net/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠️ No hay token en localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Token inválido o expirado.");
      if (window.location.pathname !== "/") {
        localStorage.removeItem("token");
        window.location.href = "/login"; 
      }
    } else if (error.response && error.response.status === 500) {
      console.error("Error en el servidor. Por favor, inténtalo de nuevo más tarde.");
    } else {
      console.error("Error inesperado:", error);
    }

    return Promise.reject(error);
  }
);

export default api;
