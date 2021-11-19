import React from 'react'
import { useSelector } from 'react-redux'
import { selectProductReviews } from '@/redux/features/productReview/productReviewSlice'
import { useRouter } from 'next/dist/client/router'
import styles from './Roadmap.module.css'

function Roadmap() {
  const items = useSelector(selectProductReviews)
  const statuses = items.map((i) => i.status)
  const planned = statuses.filter((i) => i === 'planned').length
  const inProgress = statuses.filter((i) => i === 'in-progress').length
  const suggestion = statuses.filter((i) => i === 'suggestion').length
  const live = statuses.filter((i) => i === 'live').length
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.divider}>
        <h4>Roadmap</h4>
        <p onClick={() => router.push('/roadmap')} className={styles.link}>
          View
        </p>
      </div>
      <div>
        <div className={styles.listItems}>
          <p className="dot bg-secondary" />
          <p className={styles.item}>Suggestion</p>
          <p>{suggestion}</p>
        </div>
        <div className={styles.listItems}>
          <p className="dot bg-gradient-2" />
          <p className={styles.item}>Planned</p>
          <p>{planned}</p>
        </div>
        <div className={styles.listItems}>
          <p className="dot bg-primary" />
          <p className={styles.item}>In-Progress</p>
          <p>{inProgress}</p>
        </div>
        <div className={styles.listItems}>
          <p className="dot bg-gradient-1" />
          <p className={styles.item}>Live</p>
          <p>{live}</p>
        </div>
      </div>
    </div>
  )
}

export default Roadmap
