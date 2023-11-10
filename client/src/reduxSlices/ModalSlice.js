import { createSlice } from "@reduxjs/toolkit";
import { openEditModal, closeEditModal } from "@/actions/modals.actions";

const initialState = {
  isOpen: false,
  id: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers:{
   
      [openEditModal.pending]: (state) => {
        state.loading = true;
      },
     [openEditModal.fulfilled]: (state, action) => {
        state.loading = false;
        state.isOpen = true;
        state.id = action.payload;
      },
     [openEditModal.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
     [closeEditModal.pending]: (state) => {
        state.loading = true;
      },
     [closeEditModal.fulfilled]: (state) => {
        state.loading = false;
        state.isOpen = false;
        state.id = null;
      },
     [closeEditModal.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
  },
});

export const { setCurrentPage } = modalSlice.actions;

export default modalSlice.reducer;