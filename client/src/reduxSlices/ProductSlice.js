
"use client";

import { createProduct, getProductByID, getProductsByUser, updateProduct, deleteProduct, getProducts } from '@/actions/product.actions'
import { createSlice } from '@reduxjs/toolkit'


const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    products: [],
    userProducts: [],
    // tagProducts: [],
    // relatedTours: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = [action.payload];
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProductByID.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductByID.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    },
    [getProductByID.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getProductsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userProducts = action.payload;
    },
    [getProductsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    
    [getProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.userProducts = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [updateProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userProducts = state.userProducts.map((item) =>
          item._id === id ? action.payload : item
        );
        state.products = state.products.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    }
    ,
    [deleteProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userProducts = state.userProducts.filter((item) => item._id !== id);
        state.products = state.products.filter((item) => item._id !== id);
      }
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

  },
});

export const { setCurrentPage } = ProductSlice.actions;

export default ProductSlice.reducer;
