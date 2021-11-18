import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  modalForm: false,
  openDestroyModal: false,
  destroyData: null,
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
    setOpenDestroyModal: (state) => {
      state.openDestroyModal = !state.openDestroyModal
    },
    setDestroyData: (state, action) => {
      state.destroyData = action.payload
    },
  },
})

export const { setModal, setModalForm, setOpenDestroyModal, setDestroyData } =
  modalSlice.actions

export default modalSlice.reducer
