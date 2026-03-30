import axios from 'axios';

// Create an Axios instance pointing to your FastAPI backend
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
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