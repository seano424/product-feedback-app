import { useState } from 'react'
import AddReply from '@/components/AddReply'

function CommentCard({
  userimage,
  name,
  username,
  content,
  replyingTo,
  replies,
  commentId,
  productId,
}) {
  const [openReply, setOpenReply] = useState(false)

  return (
    <>
      <div
        className={`${replyingTo && 'my-8 pl-8 '} ${
          !replyingTo && !replies && 'border-b-2 border-light-200'
        } flex space-x-2 justify-between`}
      >
        <img
          className="rounded-full h-10 "
          src={userimage ? userimage : '/assets/user-images/image-roxanne.jpg'}
          alt="user image"
        />
        <div className="flex-1 pl-2 ">
          <div className="flex justify-between">
            <div>
              <h4 className="font-bold text-xs md:text-base text-dark-200">
                {name}
              </h4>
              <p className="text-xs md:text-base text-dark-100">@{username}</p>
              <p className="py-4 text-xs md:text-base text-dark-100">
                {replyingTo && (
                  <span className="text-primary font-bold pr-2">
                    @{replyingTo}
                  </span>
                )}
                {content}
              </p>
            </div>
            <div>
              <p
                onClick={() => setOpenReply(!openReply)}
                className="text-secondary font-medium cursor-pointer"
              >
                Reply
              </p>
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
      </div>
    </>
  )
}

export default CommentCard
