import { useEffect, useState } from 'react'
import { BsFillBellFill, BsSearch } from 'react-icons/bs'
import { IoMdArrowDropright } from 'react-icons/io'
import useAuth from '../hooks/Auth'
const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  const { logout } = useAuth()

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', checkScroll)
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [])
  return (
    <header className={`transition duration-700 ${scrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <div className="text-xl font-bold text-red-600 cursor-pointer md:text-2xl">
          NEXTFLIX
        </div>
        <div className="relative group/browse">
          <div className="flex text-sm cursor-pointer md:hidden">
            <span>Browse</span>
            <IoMdArrowDropright className="w-6 h-6 rotate-90" />
          </div>
          <div className="absolute z-[0] md:hidden w-[250px] -left-[150%] top-4 hidden group-hover/browse:block h-12 cursor-auto " />

          <IoMdArrowDropright className="w-7 h-7 md:hidden opacity-0 group-hover/browse:opacity-100 text-[#dfdfdf]  top-[46.5px] group-hover/profile:opacity-100 pointer-events-none transition duration-300  absolute rotate-[270deg]" />
          <ul className="opacity-0 md:left-0 group-hover/browse:opacity-100 transition duration-300 pointer-events-none group-hover/browse:pointer-events-auto md:opacity-100 absolute border-t-2 md:border-none border-[#dfdfdf] -left-[150%] z-[500] bg-black/90 text-center w-[250px] md:w-auto flex flex-col md:gap-4 top-16 md:top-0 md:bg-inherit md:flex-row md:relative">
            <li className="font-[500] text-white hover:bg-white/10 md:hover:bg-inherit hover:text-white navLink py-4 md:py-0">
              Home
            </li>
            <li className="py-4 navLink md:py-0 hover:bg-white/10 md:hover:bg-inherit">
              Tw Shows
            </li>
            <li className="py-4 navLink md:py-0 hover:bg-white/10 md:hover:bg-inherit">
              Movies
            </li>
            <li className="py-4 navLink md:py-0 hover:bg-white/10 md:hover:bg-inherit">
              New & Popular
            </li>
            <li className="py-4 navLink md:py-0 hover:bg-white/10 md:hover:bg-inherit">
              My List
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <BsSearch className="hidden w-6 h-6 cursor-pointer md:inline hover:text-[#c5c5c5] transition duration-300" />
        <span className="hidden cursor-pointer hover:text-[#c5c5c5] lg:inline transition duration-300">
          Kids
        </span>
        <BsFillBellFill className="w-6 h-6 cursor-pointer hover:text-[#c5c5c5] transition duration-300" />

        <div className="relative cursor-pointer group/profile lg:flex lg:items-center md:gap-1 group/profileicon">
          <img
            className="w-8 h-8 rounded cursor-pointer hover:text-[#c5c5c5] transition duration-300"
            src="https://rb.gy/qi3851"
            alt="icon"
          />
          <IoMdArrowDropright className="w-6 hidden lg:block h-6 transition duration-300 rotate-90 group-hover/profileicon:rotate-[270deg]" />

          <IoMdArrowDropright className="w-7 h-7 text-[gray] opacity-0 group-hover/profile:opacity-100 pointer-events-none transition duration-300  absolute top-[44px] rotate-[270deg]" />
          <div className="absolute border border-[gray] opacity-0 group-hover/profile:opacity-100 transition pointer-events-none group-hover/profile:pointer-events-auto duration-300 right-0 bg-black/50 top-[62px] w-[200px]">
            <div className="absolute z-[0] w-full h-8 cursor-auto -top-8" />
            <button
              onClick={async () => await logout()}
              className="w-full py-2 text-center z-[2]"
            >
              Sign out of Nextflix
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
