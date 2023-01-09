import { useEffect, useState } from 'react'
import { BsFillBellFill, BsSearch } from 'react-icons/bs'
import { IoMdArrowDropright } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
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
        <ul className="hidden space-x-4 md:flex">
          <li className="navLink">Home</li>
          <li className="navLink">Tw Shows</li>
          <li className="navLink">Movies</li>
          <li className="navLink">New & Popular</li>
          <li className="navLink">My List</li>
        </ul>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <BsSearch className="hidden w-6 h-6 cursor-pointer md:inline hover:text-[#c5c5c5] transition duration-300" />
        <span className="hidden cursor-pointer hover:text-[#c5c5c5] lg:inline transition duration-300">
          Kids
        </span>
        <BsFillBellFill className="w-6 h-6 cursor-pointer hover:text-[#c5c5c5] transition duration-300" />

        <span
          onClick={async () => await logout()}
          className="cursor-pointer lg:flex lg:items-center md:gap-1 group/profileicon"
        >
          <img
            className="w-8 h-8 rounded cursor-pointer hover:text-[#c5c5c5] transition duration-300"
            src="https://rb.gy/qi3851"
            alt="icon"
          />
          <IoMdArrowDropright className="w-6 h-6 transition duration-300 rotate-90 group-hover/profileicon:rotate-[270deg]" />
          <div></div>
        </span>
      </div>
    </header>
  )
}

export default Header
