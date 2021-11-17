import { useEffect, useState } from 'react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import Comment from 'public/assets/shared/icon-comments.svg'
import { useSelector } from 'react-redux'
import { selectProductReviews } from '@/redux/features/productReview/productReviewSlice'
import { useRouter } from 'next/dist/client/router'
import { db } from '../firebase'
import {
  onSnapshot,
  collection,
  query,
  deleteDoc,
  setDoc,
  doc,
} from '@firebase/firestore'
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'

function Card({ id }) {
  const { data: session } = useSession()
  const productReviews = useSelector(selectProductReviews)
  const product = productReviews.find((p) => p.id === id)
  const router = useRouter()
  const [upVotes, setUpvotes] = useState([])
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'productRequests', id, 'upVotes')),
        (snapshot) => setUpvotes(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      setHasVoted(
        upVotes.findIndex((vote) => vote.id === session?.user?.uid) !== -1
      ),
    [upVotes]
  )

  const handleClick = () => {
    router.route !== `/feedback/[id]` && router.push(`/feedback/${id}`)
  }

  const handleVote = async (e) => {
    !session && signIn()
    if (!session) return
    e.stopPropagation()
    console.log('hello from the vote')
    if (hasVoted) {
      await deleteDoc(
        doc(db, 'productRequests', id, 'upVotes', session.user.uid)
      )
    } else {
      await setDoc(
        doc(db, 'productRequests', id, 'upVotes', session.user.uid),
        {
          name: session.user.name,
        }
      )
    }
  }

  return (
    <>
      <div onClick={handleClick}>
        {product && (
          <section className="p-8 my-8 shadow-sm cursor-pointer bg-white flex flex-col sm:flex-row  rounded-lg sm:justify-between gap-4 sm:gap-8">
            {/* Bigger Size Upvotes */}
            <article onClick={(e) => handleVote(e)} className="hidden sm:flex">
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
              <h4 className="font-bold text-sm md:text-lg">{product.title}</h4>
              <p className="text-xs md:text-base text-dark-100">
                {product.description}
              </p>
              <p className="text-xs md:text-base text-secondary  bg-light-200 max-w-max px-3 py-2 rounded-lg font-semibold">
                {product.category}
              </p>
            </article>

            {/* Bigger Size Comments */}
            <article className="hidden sm:flex ">
              <div className="flex items-center gap-2">
                <Comment />
                <p>{product.comments ? product.comments.length : 0}</p>
              </div>
            </article>

            {/* Smaller Size Upvotes and Comments */}
            <article className="flex sm:hidden justify-between">
              <div
                onClick={(e) => handleVote(e)}
                className="flex sm:flex-col bg-light-200 sm:h-12 rounded-md max-w-max px-3 py-2 cursor-pointer"
              >
                <ChevronUpIcon className="h-4 text-secondary" />
                <p className="tracking-tighter text-sm">
                  {upVotes ? upVotes.length : 0}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Comment />
                <p>{product.comments ? product.comments.length : 0}</p>
              </div>
            </article>
          </section>
        )}
      </div>
    </>
  )
}

export default Card
