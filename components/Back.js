import React from 'react'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/dist/client/router'
import Button from './Button'
function Back({ button }) {
  const { back } = useRouter()
  return (
    <div className="flex items-center justify-between py-4">
      <div
        onClick={() => back()}
        className="flex cursor-pointer items-center text-dark-100 tracking-tighter text-sm md:text-lg font-medium"
      >
        <ChevronLeftIcon className="h-4" />
        <p>Go Back</p>
      </div>
      {button === 'edit' && <Button type="edit" />}
      {button === 'add' && <Button type="add" />}
    </div>
  )
}

export default Back
