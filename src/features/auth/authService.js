import axios from 'axios';

// const API_URL = 'https://j-cassybackend.onrender.com/api/users/';
const API_URL = 'https://j-cassybackend.onrender.com/api/users/';

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

const authService = {
  register,
  login,
  logout,
};

export default authService;
