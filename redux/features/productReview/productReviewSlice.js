import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productReviews: [],
  category: 'all',
}

export const productReviewSlice = createSlice({
  name: 'productReview',
  initialState,
  reducers: {
    setProductReviews: (state, action) => {
      state.productReviews = action.payload
    },
    setComments: (state, action) => {
      state.productReviews.map((review) =>
        review.id === action.payload[0].productReviewId
          ? (review.comments = action.payload)
          : review
      )
    },
    setReplies: (state, action) => {
      state.productReviews.map((review) =>
        review.id === action.payload[0].productReviewId
          ? (review.replies = action.payload)
          : review
      )
    },
    setUpvotes: (state, action) => {
      state.productReviews.map((review) =>
        review.id === action.payload[0].productReviewId
          ? (review.upVotes = action.payload)
          : review
      )
    },
    setLeastCommentsSort: (state) => {
      state.productReviews.sort(
        (a, b) =>
          (a.comments.length + a.replies.length >
            b.comments.length + b.replies.length &&
            1) ||
          -1
      )
    },
    setMostCommentsSort: (state) => {
      state.productReviews.sort(
        (a, b) =>
          (a.comments.length + a.replies.length <
            b.comments.length + b.replies.length &&
            1) ||
          -1
      )
    },
    setMostUpVotesSort: (state) => {
      state.productReviews.sort((a, b) => (a.upVotes < b.upVotes && 1) || -1)
    },
    setLeastUpVotesSort: (state) => {
      state.productReviews.sort((a, b) => (a.upVotes > b.upVotes && 1) || -1)
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
  },
})

export const {
  setProductReviews,
  setComments,
  setUpvotes,
  setReplies,
  setLeastCommentsSort,
  setMostCommentsSort,
  setLeastUpVotesSort,
  setMostUpVotesSort,
  setFilter,
  setAll,
  setCategory,
} = productReviewSlice.actions

export const selectProductReviews = (state) =>
  state.productReview.productReviews

export const selectCategory = (state) => state.productReview.category

export default productReviewSlice.reducer
