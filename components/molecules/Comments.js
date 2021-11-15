import data from 'public/data.json'

function Comments() {
  console.log(data)
  return (
    <div className="bg-white rounded-lg px-8 py-4 my-4 h-80">
      <h1 className="text-lg font-bold my-4">4 Comments</h1>
      <div>
        <div className="flex items-center space-x-2 justify-between">
          <img
            className="rounded-full h-10"
            src="/assets/user-images/image-elijah.jpg"
            alt="user image"
          />
          <div className="flex-1 pl-2">
            <h4>Elijah Moss</h4>
            <p>@hexagon.bestagon</p>
          </div>
          <p className="text-secondary font-medium">Reply</p>
        </div>
        <div className="text-dark-100">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            nemo facilis voluptatibus incidunt mollitia cum corrupti repellat
            veritatis dolor totam inventore amet perspiciatis nostrum quasi
            reiciendis ad quis est quisquam?
          </p>
        </div>
      </div>
    </div>
  )
}

export default Comments
