import { useEffect } from 'react'
import Bar from './Bar'
import Card from './Card'
import Button from '@/components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectProductReviews } from '@/redux/features/productReview/productReviewSlice'
import useFetchFeedback from 'hooks/useFetchFeedback'
import { setMostUpVotesSort } from '@/redux/features/productReview/productReviewSlice'

function ProductReviews() {
  const productReviews = useSelector(selectProductReviews)
  const { loading } = useFetchFeedback()

  return (
    <>
      {!loading && (
        <div className="xl:my-10 xl:ml-64 xl:w-[50rem]">
          <Bar />
          {productReviews.length ? (
            <div className="mx-8 sm:mx-0">
              {productReviews.map((product) => (
                <Card key={product.id} id={product.id} data={product} />
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
