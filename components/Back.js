import React from 'react'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/dist/client/router'
import Button from './Button'
function Back({ button, color }) {
  const { back } = useRouter()
  return (
    <div className="flex items-center justify-between my-2">
      <div
        onClick={() => back()}
        className={`flex space-x-2 cursor-pointer items-center ${
          color ? color : 'text-dark-100'
        } tracking-tighter text-base md:text-lg font-medium`}
      >
        <ChevronLeftIcon className="h-6" />
        <p>Go Back</p>
      </div>
      {button === 'edit' && <Button type="edit" />}
      {button === 'add' && <Button type="add" />}
    </div>
  )
}

export default Back
