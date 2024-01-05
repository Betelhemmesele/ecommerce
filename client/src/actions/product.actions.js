import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import axios from "axios";


const API = axios.create({baseURL: 'http://localhost:3009/'});


export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({title, category, description, imageUrl, tags, price, userId}, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3009/backend/users/createProducts", {title, category, description, imageUrl, tags, price, userId});
      toast.success("Added Successfully");
      return response.data
    } catch (err) {
      console.log(title)
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProductByID = createAsyncThunk(
  "product/getProductByID",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/backend/users/products/${productId}`);;
      return {response}
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const getProducts = createAsyncThunk(
  "product/getProducts",
  async () => {
  try {
    const response = await axios.get(
      "http://localhost:3009/backend/users/getProducts"
    );
    return response.data.products;
  } catch (error) {
    console.error(error);
  }
}
);


export const getProductsByUser = createAsyncThunk(
  "product/getProductsByUser",
  async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3009/backend/users/seller/${userId}/products`,);
      return response.data.products;
    } catch (err) {
      console.error(err);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, updatedProductData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/backend/users/products/${id}`, updatedProductData);
      toast.success("Product Updated Successfully");
      return {response}
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:3009/backend/users/deleteProduct/${id}`);
      toast.success("Product Deleted Successfully");
      return {response}
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
