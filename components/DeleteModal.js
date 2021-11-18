import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOpenDestroyModal } from '@/redux/features/modal/modalSlice'
import { deleteDoc, doc } from '@firebase/firestore'
import { db } from '../firebase'
import { useRouter } from 'next/dist/client/router'

export default function DeleteModal({ page }) {
  const dispatch = useDispatch()
  const open = useSelector((state) => state.modal.openDestroyModal)
  const data = useSelector((state) => state.modal.destroyData)
  const router = useRouter()

  function closeModal() {
    dispatch(setOpenDestroyModal())
  }

  const destroy = async () => {
    dispatch(setOpenDestroyModal())
    try {
      if (page === 'messages') {
        // To delete a comment
        data.replyingTo &&
          (await deleteDoc(
            doc(
              db,
              'productRequests',
              data.productId,
              'comments',
              data.commentId,
              'replies',
              data.replyId
            )
          ))
        data.replyingTo && console.log('deleted reply:', data.replyId)

        // To delete a reply
        !data.replyingTo &&
          (await deleteDoc(
            doc(
              db,
              'productRequests',
              data.productId,
              'comments',
              data.commentId
            )
          ))
        !data.replyingTo && console.log('deleted comment:', data.commentId)
      }
      if (page === 'edit') {
        try {
          await deleteDoc(doc(db, 'productRequests', data.productId))
          console.log('Deleted:', data)
          router.push('/')
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0  bg-light-100 bg-opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Are you sure?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {`Your ${
                      page === 'edit' ? 'feedback' : 'message'
                    } will be permanently deleted. This cannot be
                    undone.`}
                  </p>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-light-100 bg-primary border border-transparent rounded-md hover:bg-gradient-1 focus:outline-none  "
                    onClick={closeModal}
                  >
                    Nevermind, thanks!
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-light-100 bg-[#fa3333] border border-transparent rounded-md hover:bg-gradient-1 focus:outline-none  "
                    onClick={destroy}
                  >
                    Delete this thing
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
