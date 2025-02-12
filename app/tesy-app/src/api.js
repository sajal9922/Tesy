import axios from 'axios'; // Add missing import statement
const api = axios.create({
  baseURL: 'http://localhost:5001',
});

export const registerUser = async (formData) => {
  return api
    .post('/register', formData)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const loginUser = async (formData) => {
  return api
    .post('/login', formData)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export default api;
