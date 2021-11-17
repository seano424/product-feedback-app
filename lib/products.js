import data from '../public/data.json'
import { onSnapshot, collection, query } from '@firebase/firestore'
import { db } from '../firebase'
import { useSelector } from 'react-redux'
import { selectProductReviews } from '@/redux/features/productReview/productReviewSlice'

export function getAllProductIds() {
  // return data.productRequests.map((p) => ({ params: { id: p.id.toString() } }))
  return onSnapshot(query(collection(db, 'productRequests')), (snapshot) => {
    let tempProductIds = snapshot.docs.map((doc) => doc.id.toString())
    return tempProductIds.map((item) => ({ params: { id: item } }))
  })
}

export function getProductData(id) {
  return data.productRequests.find((p) => p.id === +id)
}

// const [votes, setVotes] = useState([])
//   const [comments, setComments] = useState([])

//   useEffect(
//     () =>
//       onSnapshot(
//         query(collection(db, 'productRequests', id, 'upVotes')),
//         (snapshot) => {
//           setVotes(snapshot.docs)
//         }
//       ),
//     [db, id]
//   )

//   useEffect(
//     () =>
//       onSnapshot(
//         query(collection(db, 'productRequests', id, 'comments')),
//         (snapshot) => {
//           setComments(snapshot.docs)
//         }
//       ),
//     [db, id]
//   )
