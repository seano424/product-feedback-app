import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setModalForm } from '@/redux/features/modal/modalSlice'
import New from 'pages/new'

export default function ModalForm() {
  const dispatch = useDispatch()
  const open = useSelector((state) => state.modal.modalForm)

  function closeModal() {
    dispatch(setModalForm())
  }

  function openModal() {
    dispatch(setModalForm())
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10" onClose={closeModal}>
          <div className="min-h-screen text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="h-screen" aria-hidden="true">
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
              <div className="inline-block w-full h-screen text-left transition-all transform bg-white">
                <New />

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
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
