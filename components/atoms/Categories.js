import React, { useState } from 'react'
import { handleSortBy } from '@/lib/helpers'
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
  return (
    <div className="bg-white rounded-lg p-5 xl:h-48 h-48 w-80 sm:w-auto">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleSortBy('all', setSortBy)}
          className={`bg-light-200 rounded-lg px-5 py-3 text-sm font-semibold ${
            all ? 'bg-secondary text-white' : 'text-secondary'
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleSortBy('ui', setSortBy)}
          className={`bg-light-200 rounded-lg px-5 py-3 text-sm font-semibold ${
            ui ? 'bg-secondary text-white' : 'text-secondary'
          }`}
        >
          UI
        </button>
        <button
          onClick={() => handleSortBy('ux', setSortBy)}
          className={`bg-light-200 rounded-lg px-5 py-3 text-sm font-semibold ${
            ux ? 'bg-secondary text-white' : 'text-secondary'
          }`}
        >
          UX
        </button>
        <button
          onClick={() => handleSortBy('enhancement', setSortBy)}
          className={`bg-light-200 rounded-lg px-5 py-3 text-sm font-semibold ${
            enhancement ? 'bg-secondary text-white' : 'text-secondary'
          }`}
        >
          Enhancement
        </button>
        <button
          onClick={() => handleSortBy('bug', setSortBy)}
          className={`bg-light-200 rounded-lg px-5 py-3 text-sm font-semibold ${
            bug ? 'bg-secondary text-white' : 'text-secondary'
          }`}
        >
          Bug
        </button>
        <button
          onClick={() => handleSortBy('feature', setSortBy)}
          className={`bg-light-200 rounded-lg px-5 py-3 text-sm font-semibold ${
            feature ? 'bg-secondary text-white' : 'text-secondary'
          }`}
        >
          Feature
        </button>
      </div>
    </div>
  )
}

export default Categories
