import React from 'react'
import { PlusIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/dist/client/router'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'

function Button({ type }) {
  const router = useRouter()
  const { data: session } = useSession()

  const handleClick = (page) => {
    session && page === 'new' && router.push('/new')
    session && page === 'edit' && router.push(`/edit/${router.query.id}`)
    !session && signIn()
  }
  return (
    <button
      className={`cursor-pointer h-12 text-white px-3 py-2 rounded-lg text-sm ${
        type === 'edit' && 'bg-dark-300'
      } ${type === 'add' && 'bg-primary'}`}
    >
      {type === 'edit' && (
        <h3 onClick={() => handleClick('edit')}>Edit Feedback</h3>
      )}
      {type === 'add' && (
        <div
          onClick={() => handleClick('new')}
          className="flex items-center justify-between space-x-1"
        >
          <PlusIcon className="h-4" />
          <h3>Add Feedback</h3>
        </div>
      )}
    </button>
  )
}

export default Button
