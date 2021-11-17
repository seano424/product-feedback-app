import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '@/redux/features/modal/modalSlice'
import productReducer from '@/redux/features/productReview/productReviewSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    productReview: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
