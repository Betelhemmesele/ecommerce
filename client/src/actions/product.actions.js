import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("/product", updatedTourData);
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

export const getProductsByUser = createAsyncThunk(
  "tour/getProductsByUser",
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
  async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/tour/${id}`, updatedTourData);
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
      const response = await API.delete(`/tour/${id}`);
      toast.success("Product Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
