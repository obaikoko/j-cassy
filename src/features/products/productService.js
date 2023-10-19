import axios from 'axios';
const API_URL = 'https://j-cassybackend.onrender.com/products/';
// const API_URL = 'http://localhost:5000/products/';

const loadProducts = async () => {
  const response = await axios.get(API_URL);
  if (typeof window !== 'undefined') {
    localStorage.setItem('products', JSON.stringify(response.data));
  }
  return response.data;
};

const loadProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

const addProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, productData, config);
  return response.data;
};

const updateProduct = async (productData, productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    
    const response = await axios.put(API_URL + productId, productData, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const deleteProduct = async ( productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    
    const response = await axios.delete(API_URL + productId,  config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const productService = {
  loadProducts,
  loadProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
module.exports = productService;
