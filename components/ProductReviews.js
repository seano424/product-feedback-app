import { useSelector } from 'react-redux'
import {
  selectCategory,
  selectProductReviews,
} from '@/redux/features/productReview/productReviewSlice'
import useFetchFeedback from 'hooks/useFetchFeedback'
import Button from '@/components/Button'
import Bar from '@/components//Bar'
import Card from '@/components//Card'

function ProductReviews() {
  const productReviews = useSelector(selectProductReviews)
  const category = useSelector(selectCategory)
  const { loading } = useFetchFeedback()

  const copy = () => {
    switch (category) {
      case 'all':
        return productReviews
      case 'ui':
        return productReviews.filter((item) => item.category === 'ui')
      case 'ux':
        return productReviews.filter((item) => item.category === 'ux')
      case 'enhancement':
        return productReviews.filter((item) => item.category === 'enhancement')
      case 'bug':
        return productReviews.filter((item) => item.category === 'bug')
      case 'feature':
        return productReviews.filter((item) => item.category === 'feature')
      default:
        break
    }
  }

  return (
    <>
      {!loading && (
        <div className="xl:my-10 xl:ml-64 xl:w-[50rem]">
          <Bar />
          {productReviews.length ? (
            <div className="mx-8 sm:mx-0">
              {copy().length ? (
                copy().map((product) => (
                  <Card key={product.id} id={product.id} data={product} />
                ))
              ) : (
                <div className="flex justify-center items-center h-40 text-2xl text-center font-black ">
                  Looks like there are no requests under this category...
                </div>
              )}
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
