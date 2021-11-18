import { useSelector } from 'react-redux'
import Comment from '@/components/Comment'
import AddComment from '@/components/AddComment'

function Comments({ id }) {
  const state = useSelector((state) => state.productReview.productReviews)
  const product = state.find((st) => st.id === id)

  return (
    <>
      <section className="bg-white rounded-lg px-8 py-4 my-4">
        <h1 className="text-lg font-bold mt-4 mb-8">
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
