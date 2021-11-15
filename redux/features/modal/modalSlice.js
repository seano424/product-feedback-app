import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state) => {
      state.open = !state.open
    },
  },
})

export const { setModal } = modalSlice.actions

export default modalSlice.reducer
