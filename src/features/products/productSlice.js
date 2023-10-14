import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';
import { toast } from 'react-toastify';

const getProductFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  }
  return null;
};

const initialState = {
  products: getProductFromLocalStorage(),
  product: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const loadProducts = createAsyncThunk(
  'products/load',
  async (ThunkAPI) => {
    try {
      return await productService.loadProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const loadProduct = createAsyncThunk(
  'product/load',
  async (id, ThunkAPI) => {
    try {
      return await productService.loadProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return ThunkAPI.rejectWithValue(message);
    }
  }
);


export const addProduct = createAsyncThunk(
  'product/add',
  async (productData, ThunkAPI) => {
    try {
      const token = ThunkAPI.getState().auth.user.token;
      return await productService.addProduct(productData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return ThunkAPI.rejectWithValue(message);
    }
  }
);
export const updateProduct = createAsyncThunk(
  'product/update',
  async (productId,productData, ThunkAPI) => {
    try {
      const token = ThunkAPI.getState().auth.user.token;
      return await productService.updateProductroduct(productId, productData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return ThunkAPI.rejectWithValue(message);
    }
  }
);




export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loadProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.products = [];
        toast.error(action.payload);
      })
      .addCase(loadProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(loadProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.product = null;
        toast.error(action.payload);
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload);
        toast.success(`Product Added successfully`);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
        toast.success(`Product updated successfully`);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
