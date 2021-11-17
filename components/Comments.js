import { useState, useEffect } from 'react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { onSnapshot, query, collection } from '@firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import Comment from '@/components/Comment'
import AddComment from '@/components/AddComment'

function Comments({ id }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'productRequests', id, 'comments')),
        (snapshot) => {
          setComments(snapshot.docs)
          setLoading(false)
        }
      ),
    [db, id]
  )

  return (
    <>
      {!loading && (
        <>
          <section className="bg-white rounded-lg px-8 py-4 my-4">
            <h1 className="text-lg font-bold mt-4 mb-8">
              {comments.length === 1
                ? `${comments.length} Comment`
                : `${comments.length} Comments`}
            </h1>
            {comments &&
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={id}
                  commentId={comment.id}
                  comment={comment.data()}
                />
              ))}
          </section>
          <AddComment />
        </>
      )}
    </>
  )
}

export default Comments
