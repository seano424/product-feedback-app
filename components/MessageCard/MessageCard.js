import { useState } from 'react'
import AddReply from '@/components/AddReply/AddReply'
import { useSession } from 'next-auth/react'
import { TrashIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux'
import {
  setOpenDestroyModal,
  setDestroyData,
} from '@/redux/features/modal/modalSlice'
import styles from './MessageCard.module.css'

function MessageCard({
  userimage,
  name,
  username,
  content,
  replies,
  replyingTo,
  commentId,
  productId,
  replyId,
}) {
  const [openReply, setOpenReply] = useState(false)
  const dispatch = useDispatch()
  const { data: session } = useSession()

  const removeReply = async () => {
    dispatch(setOpenDestroyModal())
    dispatch(
      setDestroyData({
        replyingTo,
        commentId,
        productId,
        replyId,
      })
    )
  }

  return (
    <section
      className={`${replyingTo && 'my-8 pl-8 '} ${
        !replyingTo && !replies && 'border-b-2 border-light-200'
      } ${styles.container}`}
    >
      <img
        className="avatar"
        src={userimage ? userimage : '/assets/user-images/image-roxanne.jpg'}
        alt="user image"
      />
      <div className={styles.wrapper}>
        <div className={styles.divider}>
          <div>
            <h4>{name}</h4>
            <p className="text-dark-100">@{username}</p>
            <div className="flex space-x-2">
              <p className="py-4 text-dark-100 ">
                {replyingTo && (
                  <span className="text-primary font-bold pr-2">
                    @{replyingTo}
                  </span>
                )}
                {content}
              </p>
              <div className="flex space-x-2 py-4">
                {session?.user.username === username && (
                  <TrashIcon
                    onClick={removeReply}
                    className="text-[#ff5ccc] h-6 cursor-pointer"
                  />
                )}

                <p
                  onClick={() => setOpenReply(!openReply)}
                  className="text-secondary font-medium cursor-pointer"
                >
                  Reply
                </p>
              </div>
            </div>
          </div>
        </div>
        {openReply && (
          <AddReply
            setOpenReply={setOpenReply}
            productId={productId}
            commentId={commentId}
            replyingTo={username}
          />
        )}
      </div>
    </section>
  )
}

export default MessageCard
