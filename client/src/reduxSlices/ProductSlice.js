
"use client";

import { createProduct, getProductByID, getProductsByUser, updateProduct, deleteProduct, getProducts } from '@/actions/product.actions'
import { createSlice } from '@reduxjs/toolkit'




const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    products: [],
    userProducts: [],
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
  extraReducers:  (builder) => {
    builder
    .addCase(createProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(createProduct.fulfilled, (state,  { payload }) => {
      state.loading = false;
      state.product = payload;
      state.userProducts = payload;
    })
    .addCase(createProduct.rejected, (state,  { payload }) => {
      state.loading = false;
      state.error = payload;
    })
    .addCase(getProductByID.pending, (state) => {
      state.loading = true;
    })
    .addCase(getProductByID.fulfilled, (state,  { payload }) => {
      state.loading = false;
      state.product = payload;
    })
    .addCase(getProductByID.rejected, (state,  { payload }) => {
      state.loading = false;
      state.error = payload;
    })
    .addCase(getProductsByUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(getProductsByUser.fulfilled, (state,  { payload }) => {
      state.loading = false;
      state.userProducts = payload;
    })
    .addCase(getProductsByUser.rejected, (state,  { payload }) => {
      state.loading = false;
      state.error = payload;
    })
    .addCase(getProducts.pending, (state) => {
      state.loading = true;
    })
    .addCase(getProducts.fulfilled, (state, { payload}) => {
      state.loading = false;
      state.products = payload;
    })
    .addCase(getProducts.rejected, (state,  { payload }) => {
      state.loading = false;
      state.error = payload.message;
    })
    .addCase(updateProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateProduct.fulfilled, (state,  { payload }) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userProducts = state.userProducts.map((item) =>
          item._id === id ? payload : item
        );
        state.products = state.products.map((item) =>
          item._id === id ? payload : item
        );
      }
    })
    .addCase(updateProduct.rejected, (state,  { payload }) => {
      state.loading = false;
      state.error = payload.message;
    })
    .addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteProduct.fulfilled, (state,  action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userProducts = state.userProducts.filter((item) => item._id !== id);
        state.products = state.products.filter((item) => item._id !== id);
      }
    })
    .addCase(deleteProduct.rejected, (state,  { payload }) => {
      state.loading = false;
      state.error = payload.message;
    })
},
});

export const { setCurrentPage } = ProductSlice.actions;

export default ProductSlice.reducer;
