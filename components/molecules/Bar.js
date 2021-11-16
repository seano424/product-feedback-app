import { useRef, useState } from 'react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
  LightBulbIcon,
} from '@heroicons/react/solid'
import useOutsideClick from 'lib/hooks/useOutsideClick'
import { handleChecked } from '/lib/helpers'
import Button from '@/components/atoms/Button'
import styles from '@/styles/SuggestionBar.module.css'

function Bar() {
  const [openSortable, setOpenSortable] = useState(false)
  const [checked, setChecked] = useState({
    mostUpvotes: true,
    leastUpvotes: false,
    mostComments: false,
    leastComments: false,
  })
  const ref = useRef()

  useOutsideClick(ref, () => {
    setOpenSortable(!openSortable)
  })

  const { mostComments, mostUpvotes, leastComments, leastUpvotes } = checked

  return (
    <div className="relative">
      <div className="flex items-center bg-dark-200 text-white justify-between p-3 sm:rounded-lg h-20">
        <div className="sm:flex hidden items-center gap-2">
          <LightBulbIcon className="h-4" />
          <p className="font-bold">6 Suggestions</p>
        </div>
        <div
          onClick={() => setOpenSortable(!openSortable)}
          className="flex items-center cursor-pointer justify-between"
        >
          <p className="pr-1">Sort by: </p>
          <h3>
            {mostComments && 'Most Comments'} {mostUpvotes && 'Most Upvotes'}
            {leastComments && 'Least Comments'}{' '}
            {leastUpvotes && 'Least Upvotes'}
          </h3>
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
            onClick={() => handleChecked('mostUpvotes', setChecked)}
            className={styles.item}
          >
            <p className="hover:text-primary">Most Upvotes</p>
            {mostUpvotes && <CheckIcon className="h-4 text-primary" />}
          </div>
          <div
            onClick={() => handleChecked('leastUpvotes', setChecked)}
            className={styles.item}
          >
            <p className="hover:text-primary">Least Upvotes</p>
            {leastUpvotes && <CheckIcon className="h-4 text-primary" />}
          </div>
          <div
            onClick={() => handleChecked('mostComments', setChecked)}
            className={styles.item}
          >
            <p className="hover:text-primary">Most Comments</p>
            {mostComments && <CheckIcon className="h-4 text-primary" />}
          </div>
          <div
            onClick={() => handleChecked('leastComments', setChecked)}
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
