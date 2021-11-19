import HamburgerIcon from 'public/assets/shared/mobile/icon-hamburger.svg'
import CloseIcon from 'public/assets/shared/mobile/icon-close.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setModal } from '@/redux/features/modal/modalSlice'
import Roadmap from '@/components/Roadmap/Roadmap'
import Categories from '@/components/Categories/Categories'
import styles from './Header.module.css'

function Header() {
  const open = useSelector((state) => state.modal.open)
  const dispatch = useDispatch()

  return (
    <>
      <section className={styles.container}>
        {/* Left */}
        <div className="relative">
          <img
            className={styles.img}
            src="/assets/suggestions/tablet/background-header.png"
            alt=""
          />
          <h1 className={styles.title}>Frontend Mentor</h1>
          <h4 className={styles.subtitle}>Feedback Board</h4>
        </div>

        {/* Center */}
        <Categories />

        {/* Right roadmap */}
        <Roadmap />
      </section>

      {/* Small Size */}
      <section className={styles.smallContainer}>
        <div>
          <h1>Frontend Mentor</h1>
          <p>Feedback Board</p>
        </div>

        {/* Hamburger */}
        <div
          className="cursor-pointer sm:hidden"
          onClick={() => dispatch(setModal())}
        >
          {!open ? <HamburgerIcon /> : <CloseIcon />}
        </div>
      </section>
    </>
  )
}

export default Header
