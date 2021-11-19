import React from 'react'
import { useSelector } from 'react-redux'
import { selectProductReviews } from '@/redux/features/productReview/productReviewSlice'
import { useRouter } from 'next/dist/client/router'

function Roadmap() {
  const items = useSelector(selectProductReviews)
  const statuses = items.map((i) => i.status)
  const planned = statuses.filter((i) => i === 'planned').length
  const inProgress = statuses.filter((i) => i === 'in-progress').length
  const suggestion = statuses.filter((i) => i === 'suggestion').length
  const live = statuses.filter((i) => i === 'live').length
  const router = useRouter()
  return (
    <div className="flex flex-col justify-center bg-white p-5 rounded-lg xl:h-48 h-48">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold">Roadmap</h4>
        <p
          onClick={() => router.push('/roadmap')}
          className=" underline cursor-pointer text-secondary text-sm"
        >
          View
        </p>
      </div>
      <div>
        <div className="flex justify-between items-center gap-5">
          <p className="rounded-full h-2 w-2 bg-secondary" />
          <p className="flex-1 text-dark-100">Suggestion</p>
          <p>{suggestion}</p>
        </div>
        <div className="flex justify-between items-center gap-5">
          <p className="rounded-full h-2 w-2 bg-gradient-2" />
          <p className="flex-1 text-dark-100">Planned</p>
          <p>{planned}</p>
        </div>
        <div className="flex justify-between items-center gap-5">
          <p className="rounded-full h-2 w-2 bg-primary" />
          <p className="flex-1 text-dark-100">In-Progress</p>
          <p>{inProgress}</p>
        </div>
        <div className="flex justify-between items-center gap-5">
          <p className="rounded-full h-2 w-2 bg-gradient-1" />
          <p className="flex-1 text-dark-100">Live</p>
          <p>{live}</p>
        </div>
      </div>
    </div>
  )
}

export default Roadmap
