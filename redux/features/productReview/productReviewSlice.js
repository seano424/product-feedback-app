import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productReviews: [],
}

export const productReviewSlice = createSlice({
  name: 'productReview',
  initialState,
  reducers: {
    setProductReviews: (state, action) => {
      state.productReviews = action.payload
    },
    setComments: (state, action) => {
      state.productReviews.find((review) =>
        review.id === action.payload[0].productReviewId
          ? (review.comments = action.payload)
          : review
      )
    },
    setReplies: (state, action) => {
      state.productReviews.find((review) =>
        review.id === action.payload[0].productReviewId
          ? (review.replies = action.payload)
          : review
      )
    },
    setUpvotes: (state, action) => {
      state.productReviews.find((review) =>
        review.id === action.payload[0].productReviewId
          ? (review.upVotes = action.payload)
          : review
      )
    },
  },
})

export const { setProductReviews, setComments, setUpvotes, setReplies } =
  productReviewSlice.actions

export const selectProductReviews = (state) =>
  state.productReview.productReviews

export default productReviewSlice.reducer
