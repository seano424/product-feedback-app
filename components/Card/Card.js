import { useEffect, useState } from 'react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import Comment from 'public/assets/shared/icon-comments.svg'
import { useSelector } from 'react-redux'
import { selectProductReviews } from '@/redux/features/productReview/productReviewSlice'
import { useRouter } from 'next/dist/client/router'
import { db } from '../../firebase'
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
import styles from './Card.module.css'

function Card({ id, size }) {
  const { data: session } = useSession()
  const productReviews = useSelector(selectProductReviews)
  const product = productReviews.find((p) => p.id === id)
  const router = useRouter()
  const [upVotes, setUpvotes] = useState([])
  const [hasVoted, setHasVoted] = useState(false)

  const totalMessages =
    product.comments && product.replies
      ? product.replies?.length + product.comments?.length
      : product.comments
      ? product.comments.length
      : 0

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
    <div onClick={handleClick}>
      {product && (
        <section
          className={` ${
            size === 'sm' ? 'h-64 md:h-80' : 'sm:flex-row'
          } px-8 pb-8 pt-4 mb-8 shadow-lg cursor-pointer bg-white flex flex-col rounded-lg sm:justify-between gap-4 sm:gap-8`}
        >
          {/* Bigger Size Upvotes */}

          <article
            onClick={(e) => handleVote(e)}
            className={` ${
              size === 'sm' ? 'hidden' : 'hidden sm:flex-col sm:flex'
            }`}
          >
            <div className={`flex ${size === 'sm' ? '' : 'sm:flex-col'}`}>
              <div className={styles.votes}>
                <ChevronUpIcon className="icon text-secondary" />
                <p>{upVotes ? upVotes.length : 0}</p>
              </div>
            </div>
          </article>
          <article
            className={`flex flex-col gap-2  ${
              size === 'sm' ? '' : 'sm:flex-1'
            }`}
          >
            <h4>{product.title}</h4>
            <p className="text-dark-100">{product.description}</p>
            <button className="text-secondary bg-light-200 button-2">
              {product.category}
            </button>
          </article>

          {/* Bigger Size Comments */}
          <article className={`hidden ${size === 'sm' ? '' : 'sm:flex'}`}>
            <div className="flex items-center gap-2">
              <Comment />
              <p>{totalMessages}</p>
            </div>
          </article>

          {/* Smaller Size Upvotes and Comments */}
          <article
            className={`flex ${
              size === 'sm' ? '' : 'sm:hidden'
            } justify-between`}
          >
            <div
              onClick={(e) => handleVote(e)}
              className={`flex items-center justify-center ${
                size === 'sm' ? '' : 'sm:flex-col'
              } bg-light-200 sm:h-12 rounded-md max-w-max px-3 py-2 cursor-pointer`}
            >
              <ChevronUpIcon className="h-4 text-secondary" />
              <p className="tracking-tighter text-sm">
                {upVotes ? upVotes.length : 0}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Comment />
              <p>{totalMessages}</p>
            </div>
          </article>
        </section>
      )}
    </div>
  )
}

export default Card
