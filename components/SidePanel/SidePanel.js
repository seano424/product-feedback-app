import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setModal } from '@/redux/features/modal/modalSlice'
import Categories from '../Categories/Categories'
import Roadmap from '../Roadmap/Roadmap'
import styles from './SidePanel.module.css'

export default function SidePanel() {
  const open = useSelector((state) => state.modal.open)
  const dispatch = useDispatch()

  function closeModal() {
    dispatch(setModal())
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className={styles.dialog} onClose={closeModal}>
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
              <Dialog.Overlay className={styles.overlay} />
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
              <div className={styles.container}>
                <div className={styles.wrapper}>
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
