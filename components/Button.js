import React from 'react'
import { PlusIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/dist/client/router'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalForm } from '@/redux/features/modal/modalSlice'

function Button({ type }) {
  const router = useRouter()
  const { data: session } = useSession()

  const handleClick = () => {
    session && router.push('/new')
    !session && signIn()
  }
  return (
    <button
      className={`cursor-pointer text-white px-3 py-2 rounded-lg text-sm ${
        type === 'edit' && 'bg-dark-300'
      } ${type === 'add' && 'bg-primary'}`}
    >
      {type === 'edit' && <h3>Edit Feedback</h3>}
      {type === 'add' && (
        <div
          onClick={handleClick}
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
