import { useSelector } from 'react-redux'
import {
  selectCategory,
  selectProductReviews,
} from '@/redux/features/productReview/productReviewSlice'
import useFetchFeedback from 'hooks/useFetchFeedback'
import Button from '@/components/Button'
import Bar from '@/components/Bar/Bar'
import Card from '@/components/Card/Card'
import styles from './Requests.module.css'

function Requests() {
  const productReviews = useSelector(selectProductReviews)
  const category = useSelector(selectCategory)
  const { loading } = useFetchFeedback()

  const copy = () => {
    switch (category) {
      case 'all':
        return productReviews
      case 'ui':
        return productReviews.filter((item) => item.category === 'ui')
      case 'ux':
        return productReviews.filter((item) => item.category === 'ux')
      case 'enhancement':
        return productReviews.filter((item) => item.category === 'enhancement')
      case 'bug':
        return productReviews.filter((item) => item.category === 'bug')
      case 'feature':
        return productReviews.filter((item) => item.category === 'feature')
      default:
        break
    }
  }

  return (
    <>
      {!loading && (
        <div className={styles.container}>
          <Bar />
          {productReviews.length ? (
            <div className={styles.wrapper}>
              {copy().length ? (
                copy().map((product) => (
                  <Card key={product.id} id={product.id} data={product} />
                ))
              ) : (
                <div className={styles.emptyRequests}>
                  Looks like there are no requests under this category...
                </div>
              )}
            </div>
          ) : (
            <div className={styles.emptyContainer}>
              <img
                className="w-28"
                src="/assets/suggestions/illustration-empty.svg"
                alt=""
              />
              <h2>There is no feedback yet.</h2>
              <p>
                Got a suggestion? Found a bug that needs to be squashed? We love
                hearing about new ideas to improve our app.
              </p>
              <Button type="add" />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Requests
