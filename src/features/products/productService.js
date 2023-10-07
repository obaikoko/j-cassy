import axios from 'axios';
const API_URL = 'https://j-cassybackend.onrender.com/api/products/';

const loadProducts = async () => {
  const response = await axios.get(API_URL);
   if (typeof window !== 'undefined') {
     localStorage.setItem('products', JSON.stringify(response.data));
   }
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

const productService = {
  loadProducts,
  addProduct,
};
module.exports = productService;
