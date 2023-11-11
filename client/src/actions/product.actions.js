import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ updatedProductData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("/products", updatedProductData);
      toast.success("Added Successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProductByID = createAsyncThunk(
  "product/getProductByID",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/${productId}`);;
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ rejectWithValue }) => {
    try {
      const response = await API.get(`/products`);;
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProductsByUser = createAsyncThunk(
  "product/getProductsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/userproducts/${userId}`);;
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, updatedProductData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/products/${id}`, updatedProductData);
      toast.success("Product Updated Successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/products/${id}`);
      toast.success("Product Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
