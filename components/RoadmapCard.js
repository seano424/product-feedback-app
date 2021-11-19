import Card from './Card'
function RoadmapCard({ post, size }) {
  return (
    <div
      className={`border-t-8  rounded-lg ${
        post.status === 'in-progress' && 'border-primary'
      } ${post.status === 'planned' && ' border-gradient-2'}
                  ${post.status === 'live' && ' border-gradient-1'}`}
    >
      <div className="flex items-center space-x-2 capitalize px-8 pt-4">
        <p
          className={`h-3 w-3 rounded-full ${
            post.status === 'in-progress' && 'bg-primary'
          } ${post.status === 'planned' && ' bg-gradient-2'}
                      ${post.status === 'live' && ' bg-gradient-1'}`}
        />
        <p>{post.status}</p>
      </div>
      <Card size={size} id={post.id} />
    </div>
  )
}

export default RoadmapCard
