import React from 'react'
import { PlusIcon } from '@heroicons/react/solid'

function Button({ type }) {
  return (
    <button
      className={`cursor-pointer text-white px-3 py-2 rounded-lg text-sm ${
        type === 'edit' && 'bg-dark-300'
      } ${type === 'add' && 'bg-primary'}`}
    >
      {type === 'edit' && <h3>Edit Feedback</h3>}
      {type === 'add' && (
        <div className="flex items-center justify-between space-x-1">
          <PlusIcon className="h-4" />
          <h3>Add Feedback</h3>
        </div>
      )}
    </button>
  )
}

export default Button
