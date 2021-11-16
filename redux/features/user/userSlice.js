import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
  username: null,
  uid: null,
  image: null,
  email: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      ;(state.name = action.payload.name),
        (state.username = action.payload.username),
        (state.uid = action.payload.uid),
        (state.image = action.payload.image),
        (state.email = action.payload.email)
    },
    setSignOut: (state) => {
      state.name = null
      state.username = null
      state.uid = null
      state.image = null
      state.email = null
    },
  },
})

export const { setSignOut, setUserLogin } = userSlice.actions

export const selectUserName = (state) => state.user.name
export const selectUserEmail = (state) => state.user.email
export const selectUserPhoto = (state) => state.user.image
export const selectUserUsername = (state) => state.user.username
export const selectUser = (state) => state.user

export default userSlice.reducer
