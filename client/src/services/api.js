import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization token to requests
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

// Auth endpoints
export const authAPI = {
  getUserProfile: () => api.get('/auth/profile'),
  updateUserProfile: (data) => api.put('/auth/profile', data),
};

// Quiz endpoints
export const quizAPI = {
  getAllQuizzes: (filters) => api.get('/quizzes', { params: filters }),
  getQuizById: (id) => api.get(`/quizzes/${id}`),
  createQuiz: (data) => api.post('/quizzes', data),
  updateQuiz: (id, data) => api.put(`/quizzes/${id}`, data),
  deleteQuiz: (id) => api.delete(`/quizzes/${id}`),
  getUserQuizzes: () => api.get('/quizzes/user/my-quizzes'),
};

// Play history endpoints
export const playHistoryAPI = {
  recordPlay: (data) => api.post('/play-history', data),
  getUserHistory: (params) => api.get('/play-history/user/history', { params }),
  getQuizStats: (quizId) => api.get(`/play-history/${quizId}/stats`),
};

// Category endpoints
export const categoryAPI = {
  getAllCategories: () => api.get('/categories'),
  getCategoryBySlug: (slug) => api.get(`/categories/${slug}`),
};

export default api;
