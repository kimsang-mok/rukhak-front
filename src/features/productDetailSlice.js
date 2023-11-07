import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../utils/api";

const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId) => {
    const response = await axios.get(`/api/v1/products/${productId}`);
    return response.data.data.doc;
  }
);

const initialState = {
  data: {},
  status: "idle",
  error: null,
};

const productDetailSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productDetailSlice.reducer;
export { fetchProductById };
