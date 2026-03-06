import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
const API_BASE_URL = API_URL ? `${API_URL}/api` : '/api';

export const getAssetUrl = (url) => {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  if (API_URL && url.startsWith('/')) return `${API_URL}${url}`;
  return url;
};

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.get('/auth/logout'),
};

export const serviceService = {
  getAllServices: () => api.get('/services'),
  createService: (data) => api.post('/services', data),
  deleteService: (id) => api.delete(`/services/${id}`),
};

export const portfolioService = {
  getAllImages: (category) => 
    api.get('/portfolio', { params: { category } }),
  uploadImage: (formData) => 
    api.post('/portfolio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  deleteImage: (id) => api.delete(`/portfolio/${id}`),
};

export const contactService = {
  sendMessage: (data) => api.post('/contact', data),
  getAllMessages: () => api.get('/contact'),
};

export default api;
