import { createAsyncThunk } from "@reduxjs/toolkit";

export const openEditModal = createAsyncThunk(
  "modal/openEditModal",
  async (id) => {
    return id;
  }
);

export const closeEditModal = createAsyncThunk(
  "modal/closeEditModal",
  async () => {}
);