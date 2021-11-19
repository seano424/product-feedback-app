import { useSelector } from 'react-redux'
import Comment from '@/components/Comment'
import AddComment from '@/components/AddComment/AddComment'
import styles from './Comments.module.css'

function Comments({ id }) {
  const state = useSelector((state) => state.productReview.productReviews)
  const product = state.find((st) => st.id === id)

  return (
    <>
      <section className={styles.container}>
        <h1>
          {product.comments.length === 1
            ? `${product.comments.length} Comment`
            : `${product.comments.length} Comments`}
        </h1>
        {product.comments &&
          product.comments.map((comment) => (
            <Comment
              key={comment.commentId}
              id={id}
              commentId={comment.commentId}
              comment={comment}
            />
          ))}
      </section>
      <AddComment />
    </>
  )
}

export default Comments
