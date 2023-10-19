import axios from 'axios';

// const API_URL = 'https://j-cassybackend.onrender.com/api/users/';
const API_URL = 'http://localhost:5000/api/users/';

const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

const resetPassword = async (user) => {
  const response = await axios.post(API_URL + 'resetPassword', user);
  return response.data;
};

const verifyResetPassword = async (userData) => {
  const response = await axios.put(API_URL + 'resetPassword', userData);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  resetPassword,
  verifyResetPassword,
};

export default authService;
