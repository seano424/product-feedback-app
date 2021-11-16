import HamburgerIcon from 'public/assets/shared/mobile/icon-hamburger.svg'
import CloseIcon from 'public/assets/shared/mobile/icon-close.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setModal } from '@/redux/features/modal/modalSlice'
import Roadmap from '@/components/atoms/Roadmap'
import Categories from '@/components/atoms/Categories'

function Header() {
  const open = useSelector((state) => state.modal.open)
  const dispatch = useDispatch()

  return (
    <div>
      <div className="grid-cols-3 my-10 gap-2 hidden sm:grid xl:flex xl:flex-col xl:w-72 xl:fixed xl:left-24 ">
        {/* Left */}
        <div className="relative">
          <img
            className="w-full h-full xl:w-72 md:h-48 rounded-lg"
            src="/assets/suggestions/tablet/background-header.png"
            alt=""
          />
          <p className="absolute bottom-9 left-3 z-10 text-white text-lg font-bold">
            Frontend Mentor
          </p>
          <p className="absolute bottom-5 left-3 text-xs font-extralight z-10 text-white">
            Feedback Board
          </p>
        </div>

        {/* Center */}
        <Categories />

        {/* Right roadmap */}
        <Roadmap />
      </div>

      {/* Small Size */}
      <div className="flex w-screen justify-between items-center px-4 py-3 bg-gradient-to-tr from-gradient-1 v via-primary to-gradient-2 text-white sm:hidden h-20">
        <div>
          <h1 className="font-bold">Frontend Mentor</h1>
          <p className="text-sm text-light-200">Feedback Board</p>
        </div>

        {/* Hamburger */}
        <div
          className="cursor-pointer sm:hidden"
          onClick={() => dispatch(setModal())}
        >
          {!open ? <HamburgerIcon /> : <CloseIcon />}
        </div>
      </div>
    </div>
  )
}

export default Header
