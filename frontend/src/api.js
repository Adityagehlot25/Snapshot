import axios from 'axios';

// Get backend URL from environment variables, fallback to localhost for development
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// Create an Axios instance pointing to your FastAPI backend
const apiClient = axios.create({
  baseURL: BACKEND_URL,
});

export const analyzeImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/analyze-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};