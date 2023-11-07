import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../utils/api";

const fetchMoreReviews = createAsyncThunk(
  "moreReviews/fetchMoreReviews",
  async (productId, page) => {
    const response = await axios.get(`/api/v1/reviews/${productId}`, {
      params: {
        page,
      },
    });
    return response.data;
  }
);

const initialState = {
  data: [],
  status: "idle",
  page: 0,
  error: null,
};

const moreReviewsSlice = createSlice({
  name: "moreReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoreReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMoreReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.page += 1;
        state.data = action.payload;
      })
      .addCase(fetchMoreReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default moreReviewsSlice.reducer;
export { fetchMoreReviews };
