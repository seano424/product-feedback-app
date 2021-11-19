import { useRef, useState } from 'react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
  LightBulbIcon,
} from '@heroicons/react/solid'
import useOutsideClick from 'lib/hooks/useOutsideClick'

import Button from '@/components/Button'
import styles from '@/styles/SuggestionBar.module.css'
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

  const handleChecked = (
    toCheck,
    setChecked,
    setOpenSortable,
    dispatch,
    action
  ) => {
    switch (toCheck) {
      case 'mostComments':
        setChecked({
          mostUpvotes: false,
          leastUpvotes: false,
          mostComments: true,
          leastComments: false,
        })
        setOpenSortable(false)
        dispatch(action())
        break
      case 'mostUpvotes':
        setChecked({
          mostUpvotes: true,
          leastUpvotes: false,
          mostComments: false,
          leastComments: false,
        })
        setOpenSortable(false)
        dispatch(action())
        break
      case 'leastComments':
        setChecked({
          mostUpvotes: false,
          leastUpvotes: false,
          mostComments: false,
          leastComments: true,
        })
        dispatch(action())
        setOpenSortable(false)
        break
      case 'leastUpvotes':
        setChecked({
          mostUpvotes: false,
          leastUpvotes: true,
          mostComments: false,
          leastComments: false,
        })
        dispatch(action())
        setOpenSortable(false)
        break
      default:
        break
    }
  }

  const { mostComments, mostUpvotes, leastComments, leastUpvotes } = checked

  return (
    <div className="relative">
      <div className="flex items-center bg-dark-200 text-white justify-between p-3 sm:rounded-lg h-20">
        <div className="sm:flex hidden items-center gap-2">
          <LightBulbIcon
            onClick={() => dispatch(setLeastCommentsSort())}
            className="h-4"
          />
          <p className="font-bold">{productCount} Suggestions</p>
        </div>
        <div
          onClick={() => setOpenSortable(!openSortable)}
          className="flex items-center cursor-pointer justify-between"
        >
          <p className="pr-1">Sort by: </p>
          {mostComments && <p>Most Comments</p>}
          {mostUpvotes && <p>Most Upvotes</p>}
          {leastComments && <p>Least Comments</p>}
          {leastUpvotes && <p>Least Upvotes</p>}

          {openSortable ? (
            <ChevronUpIcon className="h-4" />
          ) : (
            <ChevronDownIcon className="h-4" />
          )}
        </div>
        <Button type="add" />
      </div>

      {/* Sortable Section */}
      {openSortable && (
        <div
          ref={ref}
          className={'bg-white w-64 m-4 rounded-lg absolute shadow sm:left-56'}
        >
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
            <p className="hover:text-primary">Most Upvotes</p>
            {mostUpvotes && <CheckIcon className="h-4 text-primary" />}
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
            <p className="hover:text-primary">Least Upvotes</p>
            {leastUpvotes && <CheckIcon className="h-4 text-primary" />}
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
            <p className="hover:text-primary">Most Comments</p>
            {mostComments && <CheckIcon className="h-4 text-primary" />}
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
            <p className="hover:text-primary">Least Comments</p>
            {leastComments && <CheckIcon className="h-4 text-primary" />}
          </div>
        </div>
      )}
    </div>
  )
}

export default Bar
