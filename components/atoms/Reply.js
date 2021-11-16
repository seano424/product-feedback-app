function Reply() {
  return (
    <div className="my-4 pl-4 border-l-2 border-light-200">
      <div className="flex items-center space-x-2 justify-between">
        <img
          className="rounded-full h-10"
          src="/assets/user-images/image-elijah.jpg"
          alt="user image"
        />
        <div className="flex-1 pl-2">
          <h4 className="font-bold">Elijah Moss</h4>
          <p className="text-dark-100">@hexagon.bestagon</p>
        </div>
        <p className="text-secondary font-medium">Reply</p>
      </div>
      <div className="text-dark-100 py-2 border-b-2 border-light-100">
        <p>
          <span className="text-primary font-bold">@hexagon.bestagon</span>{' '}
          ipsum dolor sit amet consectetur adipisicing elit. Voluptas, nemo
        </p>
      </div>
    </div>
  )
}

export default Reply
