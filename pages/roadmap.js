import { useState, useEffect } from 'react'
import Back from '@/components/Back'
import Button from '@/components/Button'
import Tabs from '@/components/Tabs'
import useFetchFeedback from 'hooks/useFetchFeedback'
import { useSelector } from 'react-redux'
import { selectProductReviews } from '@/redux/features/productReview/productReviewSlice'
import RoadmapCard from '@/components/RoadmapCard'

function Roadmap() {
  const { loading } = useFetchFeedback()
  const items = useSelector(selectProductReviews)
  const [categories, setCategories] = useState({})

  useEffect(() => {
    setCategories({
      Planned: [...items.filter((i) => i.status === 'planned')],
      InProgress: [...items.filter((i) => i.status === 'in-progress')],
      Live: [...items.filter((i) => i.status === 'live')],
    })
  }, [items])

  return (
    <main className="xl:px-20 sm:py-8 sm:px-10">
      {/* header */}
      <section className="flex rounded justify-between h-28 px-10 lg:mb-10 items-center bg-dark-200 text-white">
        <div className="flex flex-col space-y-2">
          <Back color="white" />
          <h2 className="text-xl font-bold tracking-wide ">Roadmap</h2>
        </div>
        <Button type="add" />
      </section>

      {/* Tabs on Small Device */}
      <Tabs />
      {/* Grid on Larger Device */}
      <section className="hidden lg:grid grid-cols-3 gap-10 px-10 xl:px-0">
        {Object.keys(categories).map((category) => (
          <div className="mt-4" key={category}>
            <h2 className="font-bold tracking-wide text-xl mb-2">
              {category === 'InProgress' ? 'In-Progress' : category}
            </h2>
            <p className="text-dark-100">
              {category === 'InProgress' && 'Currently being developed'}
              {category === 'Planned' && 'Ideas prioritized for research'}
              {category === 'Live' && 'Released features'}
            </p>
          </div>
        ))}
        {Object.values(categories).map((posts, idx) => (
          <div>
            {posts.map((post) => (
              <RoadmapCard key={post.id} post={post} />
            ))}
          </div>
        ))}
      </section>
    </main>
  )
}

export default Roadmap
