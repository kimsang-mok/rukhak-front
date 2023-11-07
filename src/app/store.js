import { configureStore } from "@reduxjs/toolkit";
import productDetailReducer from "./../features/productDetailSlice";
import moreReviewsReducer from "./../features/moreReviewSlice";

export const store = configureStore({
  reducer: {
    productDetail: productDetailReducer,
    moreReviews: moreReviewsReducer,
  },
});

export default store;
