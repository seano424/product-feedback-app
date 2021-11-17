import Link from 'next/link'
import { ChevronUpIcon } from '@heroicons/react/solid'
import Comment from 'public/assets/shared/icon-comments.svg'

import { useSelector } from 'react-redux'

import { selectProductReviews } from '@/redux/features/productReview/productReviewSlice'

function Card({ id }) {
  const productReviews = useSelector(selectProductReviews)
  const product = productReviews.find((p) => p.id === id)

  return (
    <Link href={`/feedback/${id}`}>
      <a>
        {product && (
          <section className="p-8 my-8 shadow-sm cursor-pointer bg-white flex flex-col sm:flex-row  rounded-lg sm:justify-between gap-4 sm:gap-8">
            <article className="hidden sm:flex">
              <div className="flex sm:flex-col">
                <div className="bg-light-200 rounded-lg px-3 py-2 flex flex-col items-center cursor-pointer">
                  <ChevronUpIcon className="h-4 text-secondary" />
                  <p className="tracking-tighter text-sm md:text-lg">
                    {product.upVotes ? product.upVotes.length : 0}
                  </p>
                </div>
              </div>
            </article>
            <article className="flex flex-col gap-2 sm:flex-1">
              <h4 className="font-bold text-sm md:text-lg">{product.title}</h4>
              <p className="text-xs md:text-base text-dark-100">
                {product.description}
              </p>
              <p className="text-xs md:text-base text-secondary  bg-light-200 max-w-max px-3 py-2 rounded-lg font-semibold">
                {product.category}
              </p>
            </article>
            <article className="hidden sm:flex ">
              <div className="flex items-center gap-2">
                <Comment />
                <p>{product.comments ? product.comments.length : 0}</p>
              </div>
            </article>
            <article className="flex sm:hidden justify-between">
              <div className="flex sm:flex-col bg-light-200 sm:h-12 rounded-md max-w-max px-3 py-2 cursor-pointer">
                <ChevronUpIcon className="h-4 text-secondary" />
                <p className="tracking-tighter text-sm">
                  {product.upVotes ? product.upVotes.length : 0}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Comment />
                <p>{product.comments ? product.comments.length : 0}</p>
              </div>
            </article>
          </section>
        )}
      </a>
    </Link>
  )
}

export default Card
