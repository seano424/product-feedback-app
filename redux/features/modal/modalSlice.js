import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  modalForm: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state) => {
      state.open = !state.open
    },
    setModalForm: (state) => {
      state.modalForm = !state.modalForm
    },
  },
})

export const { setModal, setModalForm } = modalSlice.actions

export default modalSlice.reducer
