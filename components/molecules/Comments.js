import data from 'public/data.json'
import Comment from '@/components/atoms/Comment'

function Comments({ comments }) {
  return (
    <section className="bg-white rounded-lg px-8 py-4 my-4">
      <h1 className="text-lg font-bold mt-4 mb-8">4 Comments</h1>
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </section>
  )
}

export default Comments
