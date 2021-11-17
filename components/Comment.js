import { useState, useEffect } from 'react'
import { onSnapshot, query, collection } from '@firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import CommentCard from '@/components/CommentCard'
import AddReply from '@/components/AddReply'

function Comment({ comment, id, commentId }) {
  const { content, username, name, userimage } = comment

  const [replies, setReplies] = useState([])

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(
            db,
            'productRequests',
            id,
            'comments',
            commentId,
            'replies'
          )
        ),
        (snapshot) => {
          setReplies(snapshot.docs)
        }
      ),
    [db, id]
  )

  return (
    <section className="my-8">
      <CommentCard
        userimage={userimage}
        name={name}
        username={username}
        content={content}
        replies={replies}
      />

      {/* Replies */}
      {replies &&
        replies.map((reply) => (
          <CommentCard
            key={reply.id}
            userimage={reply.data().userimage}
            name={reply.data().name}
            username={reply.data().username}
            content={reply.data().content}
            replyingTo={reply.data().replyingTo}
          />
        ))}
    </section>
  )
}

export default Comment
