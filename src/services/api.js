// src/services/api.js
import axios from "axios";

// URL de tu backend (puerto 5000 por defecto)
const BASE_URL = "http://localhost:5000/api";

// Crear una instancia de axios
const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para enviar token en cada request si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============ FUNCIONES DE AUTENTICACIÓN ============

export const registerUser = async (username, email, password) => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

// ============ FUNCIONES DE PRODUCTOS ============

export const getProducts = async (category, search) => {
  // Ejemplo de query: ?category=Algo&search=Texto
  let url = "/products";
  const params = [];
  if (category) params.push(`category=${category}`);
  if (search) params.push(`search=${search}`);
  if (params.length > 0) {
    url += "?" + params.join("&");
  }
  const response = await api.get(url);
  return response.data;
};

export const createProduct = async (productData) => {
  // Para admin
  const response = await api.post("/products", productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  // Para admin
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  // Para admin
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// ============ FUNCIONES DE ÓRDENES ============

export const createOrder = async (cartItems) => {
  //cartItems = [{ productId, quantity }, ...]//
  const response = await api.post("/orders/create", { cartItems } );
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders/myorders");
  return response.data;
};

export const getAllOrders = async () => {
  // Para admin
  const response = await api.get("/orders");
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  console.log(`Enviando: orderId=${orderId}, status=${status}`); // Debug
  const response = await api.put(`/orders/${orderId}`, { status });
  console.log("Respuesta del servidor:", response.data); // Debug
  return response.data;
};

// export default api; (opcional si quieres usar la instancia directa)
