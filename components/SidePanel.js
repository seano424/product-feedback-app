import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setModal } from '@/redux/features/modal/modalSlice'
import Categories from './Categories'
import Roadmap from './Roadmap'

export default function SidePanel() {
  const open = useSelector((state) => state.modal.open)
  const dispatch = useDispatch()

  function closeModal() {
    dispatch(setModal())
  }

  function openModal() {
    dispatch(setModal())
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed top-40 border pl-32 inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="h-full text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 top-40 bg-dark-200 bg-opacity-60" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            {/* <span className="inline-block h-screen " aria-hidden="true">
              &#8203;
            </span> */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="flex justify-center p-6 w-full overflow-hidden text-left transition-all transform bg-light-100 shadow-xl h-full">
                <div className="flex flex-col space-y-6">
                  <Categories />
                  <Roadmap />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
