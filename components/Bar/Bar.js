import { useRef, useState } from 'react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
  LightBulbIcon,
} from '@heroicons/react/solid'
import useOutsideClick from 'lib/hooks/useOutsideClick'
import { handleChecked } from '@/lib/helpers'
import Button from '@/components/Button'
import styles from './Bar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  setLeastCommentsSort,
  setMostCommentsSort,
  setMostUpVotesSort,
  setLeastUpVotesSort,
} from '@/redux/features/productReview/productReviewSlice'
function Bar() {
  const [openSortable, setOpenSortable] = useState(false)
  const [checked, setChecked] = useState({
    mostUpvotes: false,
    leastUpvotes: false,
    mostComments: false,
    leastComments: false,
  })
  const ref = useRef()
  const dispatch = useDispatch()
  const productCount = useSelector(
    (state) => state.productReview.productReviews
  ).length

  useOutsideClick(ref, () => {
    setOpenSortable(!openSortable)
  })

  const { mostComments, mostUpvotes, leastComments, leastUpvotes } = checked

  return (
    <>
      <section className={styles.container}>
        <div className={styles.left}>
          <LightBulbIcon
            onClick={() => dispatch(setLeastCommentsSort())}
            className="icon"
          />
          <p className="font-bold">{productCount} Suggestions</p>
        </div>
        <div
          onClick={() => setOpenSortable(!openSortable)}
          className={styles.center}
        >
          <p className="pr-1">Sort by: </p>
          {mostComments && <p>Most Comments</p>}
          {mostUpvotes && <p>Most Upvotes</p>}
          {leastComments && <p>Least Comments</p>}
          {leastUpvotes && <p>Least Upvotes</p>}

          {openSortable ? (
            <ChevronUpIcon className="icon" />
          ) : (
            <ChevronDownIcon className="icon" />
          )}
        </div>
        <Button type="add" />
      </section>

      {/* Sortable Section */}
      {openSortable && (
        <div ref={ref} className={styles.sortable}>
          <div
            onClick={() =>
              handleChecked(
                'mostUpvotes',
                setChecked,
                setOpenSortable,
                dispatch,
                setMostUpVotesSort
              )
            }
            className={styles.item}
          >
            <p className={styles.listItem}>Most Upvotes</p>
            {mostUpvotes && <CheckIcon className="icon text-primary" />}
          </div>
          <div
            onClick={() =>
              handleChecked(
                'leastUpvotes',
                setChecked,
                setOpenSortable,
                dispatch,
                setLeastUpVotesSort
              )
            }
            className={styles.item}
          >
            <p className={styles.listItem}>Least Upvotes</p>
            {leastUpvotes && <CheckIcon className="icon text-primary" />}
          </div>
          <div
            onClick={() =>
              handleChecked(
                'mostComments',
                setChecked,
                setOpenSortable,
                dispatch,
                setMostCommentsSort
              )
            }
            className={styles.item}
          >
            <p className={styles.listItem}>Most Comments</p>
            {mostComments && <CheckIcon className="icon text-primary" />}
          </div>
          <div
            onClick={() =>
              handleChecked(
                'leastComments',
                setChecked,
                setOpenSortable,
                dispatch,
                setLeastCommentsSort
              )
            }
            className={styles.item}
          >
            <p className={styles.listItem}>Least Comments</p>
            {leastComments && <CheckIcon className="icon text-primary" />}
          </div>
        </div>
      )}
    </>
  )
}

export default Bar
