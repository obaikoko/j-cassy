import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';



const initialState = {
  products: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const loadProducts = createAsyncThunk(
  'product/load',
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

export const addProduct = createAsyncThunk(
  'product/add',
  async (productData, ThunkAPI) => {
    try {
      const token = ThunkAPI.getState().auth.user.token;
      return await productService.addProduct(productData, token);
    } catch (error) {
      console.error('Error:', error);
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
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.products = [];
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
