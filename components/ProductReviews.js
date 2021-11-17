import { useState, useEffect } from 'react'
import Bar from './Bar'
import Card from './Card'
import Button from '@/components/Button'
import { useSelector } from 'react-redux'
import { selectProductReviews } from '@/redux/features/productReview/productReviewSlice'
import { useDispatch } from 'react-redux'
import { onSnapshot, query, collection } from '@firebase/firestore'
import { setProductReviews } from '@/redux/features/productReview/productReviewSlice'
import { db } from '../firebase'

function ProductReviews() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const productReviews = useSelector(selectProductReviews)

  useEffect(
    () =>
      onSnapshot(query(collection(db, 'productRequests')), (snapshot) => {
        let tempProductReviews = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data(), comments: [], upVotes: [] }
        })
        setLoading(false)
        dispatch(setProductReviews(tempProductReviews))
      }),
    [db]
  )

  console.log('product reviews:', productReviews)

  return (
    <>
      {!loading && (
        <div className="xl:my-10 xl:ml-64 xl:w-[50rem]">
          <Bar />
          {productReviews.length ? (
            <div className="mx-8 sm:mx-0">
              {productReviews.map((product) => (
                <Card key={product.id} id={product.id} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center  mt-8 rounded-lg text-center mx-10 sm:mx-auto gap-5 bg-white p-20">
              <img
                className="w-28"
                src="/assets/suggestions/illustration-empty.svg"
                alt=""
              />
              <h2 className="font-bold text-dark-200 tracking-wide pt-4">
                There is no feedback yet.
              </h2>
              <p className=" text-dark-100 pb-4">
                Got a suggestion? Found a bug that needs to be squashed? We love
                hearing about new ideas to improve our app.
              </p>
              <Button type="add" />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ProductReviews
