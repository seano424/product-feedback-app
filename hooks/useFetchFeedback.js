import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { onSnapshot, query, collection } from '@firebase/firestore'
import {
  setProductReviews,
  setUpvotes,
  setComments,
  setReplies,
} from '@/redux/features/productReview/productReviewSlice'
import { db } from '../firebase'

function useFetchFeedback() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(
    async () =>
      await onSnapshot(query(collection(db, 'productRequests')), (snapshot) => {
        let tempProductReviews = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
            comments: [],
            upVotes: [],
            replies: [],
          }
        })
        dispatch(setProductReviews(tempProductReviews))
        tempProductReviews.map(async (product) => {
          await onSnapshot(
            query(collection(db, 'productRequests', product.id, 'upVotes')),
            (snapshot) => {
              const tempVotes = snapshot.docs.map((doc) => {
                return {
                  ...doc.data(),
                  voterId: doc.id,
                  productReviewId: product.id,
                }
              })
              tempVotes.length > 0 && dispatch(setUpvotes(tempVotes))
            }
          )
        })

        tempProductReviews.map(async (product) => {
          await onSnapshot(
            query(collection(db, 'productRequests', product.id, 'comments')),
            (snapshot) => {
              const tempComments = snapshot.docs.map((doc) => {
                return {
                  ...doc.data(),
                  commentId: doc.id,
                  productReviewId: product.id,
                }
              })
              tempComments.map(async (comment) => {
                await onSnapshot(
                  query(
                    collection(
                      db,
                      'productRequests',
                      product.id,
                      'comments',
                      comment.commentId,
                      'replies'
                    )
                  ),
                  (snapshot) => {
                    const tempReplies = snapshot.docs.map((doc2) => {
                      return {
                        ...doc2.data(),
                        replyId: doc2.id,
                        productReviewId: product.id,
                      }
                    })

                    tempReplies.length > 0 && dispatch(setReplies(tempReplies))
                  }
                )
              })

              tempComments.length > 0 && dispatch(setComments(tempComments))
            }
          )
        })

        setLoading(false)
      }),
    [db]
  )

  return { loading }
}

export default useFetchFeedback
