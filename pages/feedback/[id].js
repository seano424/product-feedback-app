import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import {
  getDocs,
  doc,
  getDoc,
  onSnapshot,
  query,
  collection,
} from '@firebase/firestore'
import { useDispatch } from 'react-redux'
import Card from '@/components/Card'
import Layout from '@/components/Layout'
import Back from '@/components/Back'
import Comments from '@/components/Comments'
import {
  setProductReviews,
  setUpvotes,
  setComments,
} from '@/redux/features/productReview/productReviewSlice'

function Feedback({ id }) {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(
    async () =>
      await onSnapshot(query(collection(db, 'productRequests')), (snapshot) => {
        let tempProductReviews = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data(), comments: [], upVotes: [] }
        })
        dispatch(setProductReviews(tempProductReviews))
        tempProductReviews.map((product) => {
          onSnapshot(
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
        tempProductReviews.map((product) => {
          onSnapshot(
            query(collection(db, 'productRequests', product.id, 'comments')),
            (snapshot) => {
              const tempComments = snapshot.docs.map((doc) => {
                return {
                  ...doc.data(),
                  commentId: doc.id,
                  productReviewId: product.id,
                }
              })
              tempComments.length > 0 && dispatch(setComments(tempComments))
            }
          )
        })
        setLoading(false)
      }),
    [db]
  )

  return (
    <Layout>
      {!loading && (
        <>
          <Back button="edit" />
          <Card id={id} />
          <Comments id={id} />
        </>
      )}
    </Layout>
  )
}

export default Feedback

export async function getStaticPaths() {
  // Return a list of possible value for id
  const snapshot = await getDocs(collection(db, 'productRequests'))
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const docRef = doc(db, 'productRequests', params.id)
  const docSnap = await getDoc(docRef)
  return {
    props: {
      id: docSnap.id,
    },
  }
}
