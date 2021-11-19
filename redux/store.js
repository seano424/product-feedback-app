import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '@/redux/features/modal/modalSlice'
import productReducer from '@/redux/features/productReview/productReviewSlice'
import sortReducer from '@/redux/features/sort/sortSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    productReview: productReducer,
    sort: sortReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
