import axios from 'axios';

const API_URL = 'http://localhost:5001/api/mbti';

const api = axios.create({
  baseURL: API_URL,
});

export const getQuestions = async () => {
  try {
    const response = await api.get('/questions');
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const calculateResult = async (answers) => {
  try {
    const response = await api.post('/calculate', { answers });
    return response.data;
  } catch (error) {
    console.error('Error calculating result:', error);
    throw error;
  }
};

export const getTypeDetails = async (type) => {
  try {
    const response = await api.get(`/type/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for type ${type}:`, error);
    throw error;
  }
};

export const getJobRecommendations = async (type) => {
  try {
    const response = await api.get(`/recommendations/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recommendations for type ${type}:`, error);
    throw error;
  }
};
