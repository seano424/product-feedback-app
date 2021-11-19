import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOpenDestroyModal } from '@/redux/features/modal/modalSlice'
import { deleteDoc, doc } from '@firebase/firestore'
import { db } from '../../firebase'
import { useRouter } from 'next/dist/client/router'
import styles from './DeleteModal.module.css'

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
        <Dialog as="div" className={styles.dialog} onClose={closeModal}>
          <div className={styles.transition}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className={styles.overlay} />
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
              <div className={styles.container}>
                <Dialog.Title as="h3" className={styles.title}>
                  Are you sure?
                </Dialog.Title>
                <div className="mt-2">
                  <p>
                    {`Your ${
                      page === 'edit' ? 'feedback' : 'message'
                    } will be permanently deleted. This cannot be
                    undone.`}
                  </p>
                </div>

                <div className={styles.buttonsWrapper}>
                  <button
                    type="button"
                    className="bg-primary button-delete  "
                    onClick={closeModal}
                  >
                    Nevermind, thanks!
                  </button>
                  <button
                    type="button"
                    className="bg-[#fa3333] button-delete  "
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
