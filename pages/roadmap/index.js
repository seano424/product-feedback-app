import { useState, useEffect } from 'react'
import Back from '@/components/Back'
import Button from '@/components/Button'
import Tabs from '@/components/Tabs/Tabs'
import useFetchFeedback from 'hooks/useFetchFeedback'
import { useSelector } from 'react-redux'
import { selectProductReviews } from '@/redux/features/productReview/productReviewSlice'
import RoadmapCard from '@/components/RoadmapCard'
import styles from './roadmap.module.css'

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
    <main className={styles.main}>
      {/* header */}
      <section className={styles.header}>
        <div className={styles.divider}>
          <Back color="white" />
          <h2 className={styles.title}>Roadmap</h2>
        </div>
        <Button type="add" />
      </section>

      {/* Tabs on Small Device */}
      <Tabs />
      {/* Grid on Larger Device */}
      <section className={styles.grid}>
        {Object.keys(categories).map((category) => (
          <div className="mt-4" key={category}>
            <h2 className={styles.gridHeader}>
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
              <RoadmapCard size="sm" key={post.id} post={post} />
            ))}
          </div>
        ))}
      </section>
    </main>
  )
}

export default Roadmap
