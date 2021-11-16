import Reply from './Reply'
function Comment({ comment }) {
  const { content, user, replies } = comment

  return (
    <section className="my-8 border-b border-light-200">
      <div className="flex items-center space-x-2 justify-between">
        <img
          className="rounded-full h-10"
          src={user.image.replace('.', '')}
          alt="user image"
        />
        <div className="flex-1 pl-2">
          <h4 className="font-bold">{user.name}</h4>
          <p className="text-dark-100">@{user.username}</p>
        </div>
        <p className="text-secondary font-medium">Reply</p>
      </div>
      <div className="text-dark-100 py-4 ">
        <p>{content}</p>
      </div>

      {/* Replies */}
      {/* <Reply /> */}
    </section>
  )
}

export default Comment
