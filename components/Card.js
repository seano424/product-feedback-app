import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronUpIcon } from '@heroicons/react/solid'
import Comment from 'public/assets/shared/icon-comments.svg'
import { onSnapshot, query, collection } from '@firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import {
  setUpvotes,
  setComments,
} from '@/redux/features/productReview/productReviewSlice'
import { selectProductReviews } from '@/redux/features/productReview/productReviewSlice'

function Card({ id }) {
  const [productReview, setProductReview] = useState([])
  const dispatch = useDispatch()
  const products = useSelector(selectProductReviews)
  const { upVotes, comments, category, description, title } = productReview
  useEffect(
    () => setProductReview(products.find((product) => product.id === id)),
    []
  )

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'productRequests', id, 'upVotes')),
        (snapshot) => {
          // setVotes(snapshot.docs)
          const tempVotes = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              voterId: doc.id,
              productReviewId: id,
            }
          })
          console.log(tempVotes.length)
          tempVotes.length > 0 && dispatch(setUpvotes(tempVotes))
        }
      ),
    [db, id]
  )

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'productRequests', id, 'comments')),
        (snapshot) => {
          // setComments(snapshot.docs)
          const tempComments = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              commentId: doc.id,
              productReviewId: id,
            }
          })
          console.log('comments', tempComments)
          tempComments.length > 0 && dispatch(setComments(tempComments))
        }
      ),
    [db, id]
  )

  return (
    <Link href={`/feedback/${id}`}>
      <a>
        <section className="p-8 my-8 shadow-sm cursor-pointer bg-white flex flex-col sm:flex-row  rounded-lg sm:justify-between gap-4 sm:gap-8">
          <article className="hidden sm:flex">
            <div className="flex sm:flex-col">
              <div className="bg-light-200 rounded-lg px-3 py-2 flex flex-col items-center cursor-pointer">
                <ChevronUpIcon className="h-4 text-secondary" />
                <p className="tracking-tighter text-sm md:text-lg">
                  {upVotes ? upVotes.length : 0}
                </p>
              </div>
            </div>
          </article>
          <article className="flex flex-col gap-2 sm:flex-1">
            <h4 className="font-bold text-sm md:text-lg">{title}</h4>
            <p className="text-xs md:text-base text-dark-100">{description}</p>
            <p className="text-xs md:text-base text-secondary  bg-light-200 max-w-max px-3 py-2 rounded-lg font-semibold">
              {category}
            </p>
          </article>
          <article className="hidden sm:flex ">
            <div className="flex items-center gap-2">
              <Comment />
              <p>{comments ? comments.length : 0}</p>
            </div>
          </article>
          <article className="flex sm:hidden justify-between">
            <div className="flex sm:flex-col bg-light-200 sm:h-12 rounded-md max-w-max px-3 py-2 cursor-pointer">
              <ChevronUpIcon className="h-4 text-secondary" />
              <p className="tracking-tighter text-sm">
                {upVotes ? upVotes.length : 0}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Comment />
              <p>{comments ? comments.length : 0}</p>
            </div>
          </article>
        </section>
      </a>
    </Link>
  )
}

export default Card
