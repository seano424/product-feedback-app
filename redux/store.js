import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '@/redux/features/modal/modalSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
})
