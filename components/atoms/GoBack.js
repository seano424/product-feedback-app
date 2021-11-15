import React from 'react'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/dist/client/router'
import EditButton from './EditButton'
import AddButton from './AddButton'
function GoBack({ button }) {
  const { back } = useRouter()
  return (
    <div className="flex items-center justify-between my-4">
      <div
        onClick={() => back()}
        className="flex cursor-pointer items-center text-dark-100 tracking-tighter text-sm font-medium"
      >
        <ChevronLeftIcon className="h-4" />
        <p>Go Back</p>
      </div>
      {button === 'edit' && <EditButton />}
      {button === 'add' && <AddButton />}
    </div>
  )
}

export default GoBack
