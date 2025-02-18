import axios from "axios";

const api = axios.create({
  baseURL: "http://desarrollo.cenarb.net/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token enviado en la solicitud:", config.headers.Authorization); // ✅ Verificación
  } else {
    console.warn("⚠️ No hay token en localStorage");
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
