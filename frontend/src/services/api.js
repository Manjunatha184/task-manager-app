import axios from "axios";

// Determine API URL based on environment
const getAPIUrl = () => {
  // Use localhost:8000 for Docker setup (both frontend and backend ports are exposed)
  return `http://localhost:8000`;
};

const API_URL = import.meta.env.VITE_API_URL || getAPIUrl();

// Create axios client instance
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (email, password) =>
    apiClient.post("/auth/register", { email, password }),

  login: (email, password) =>
    apiClient.post("/auth/login", { email, password }),
};

// Tasks API
export const tasksAPI = {
  getTasks: (skip = 0, limit = 10, status = null) => {
    const params = { skip, limit };
    if (status) params.status_filter = status;

    return apiClient.get("/tasks", { params });
  },

  getTask: (id) => apiClient.get(`/tasks/${id}`),

  createTask: (title, description = "", status = "todo") =>
    apiClient.post("/tasks", { title, description, status }),

  updateTask: (id, updates) =>
    apiClient.put(`/tasks/${id}`, updates),

  deleteTask: (id) => apiClient.delete(`/tasks/${id}`),
};

export default apiClient;