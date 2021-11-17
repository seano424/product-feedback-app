import React, { useState } from 'react'
import { handleSortBy } from '@/lib/helpers'
import { useSession } from 'next-auth/react'
function Categories() {
  const [sortBy, setSortBy] = useState({
    all: true,
    ui: false,
    ux: false,
    enhancement: false,
    bug: false,
    feature: false,
  })
  const { all, ui, ux, enhancement, bug, feature } = sortBy
  const { data: session } = useSession()

  return (
    <div className="bg-white rounded-lg relative px-2 py-2 p-5 xl:h-48 h-48 w-80 sm:w-auto">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleSortBy('all', setSortBy)}
          className={` rounded-lg px-2 py-2  ${
            all ? 'bg-secondary text-white' : 'text-secondary bg-light-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleSortBy('ui', setSortBy)}
          className={` rounded-lg px-2 py-2  ${
            ui ? 'bg-secondary text-white' : 'text-secondary bg-light-200'
          }`}
        >
          UI
        </button>
        <button
          onClick={() => handleSortBy('ux', setSortBy)}
          className={` rounded-lg px-2 py-2  ${
            ux ? 'bg-secondary text-white' : 'text-secondary bg-light-200'
          }`}
        >
          UX
        </button>
        <button
          onClick={() => handleSortBy('enhancement', setSortBy)}
          className={` rounded-lg px-2 py-2  ${
            enhancement
              ? 'bg-secondary text-white'
              : 'text-secondary bg-light-200'
          }`}
        >
          Enhancement
        </button>
        <button
          onClick={() => handleSortBy('bug', setSortBy)}
          className={` rounded-lg px-2 py-2  ${
            bug ? 'bg-secondary text-white' : 'text-secondary bg-light-200'
          }`}
        >
          Bug
        </button>
        <button
          onClick={() => handleSortBy('feature', setSortBy)}
          className={`rounded-lg px-2 py-2  ${
            feature ? 'bg-secondary text-white' : 'text-secondary bg-light-200'
          }`}
        >
          Feature
        </button>
      </div>
      {session && (
        <img
          src={session.user.image}
          alt="user image"
          className="rounded-full h-12 absolute bottom-2 right-2"
        />
      )}
    </div>
  )
}

export default Categories
