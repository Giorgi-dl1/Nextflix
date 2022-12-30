import { useEffect, useState } from 'react'
import { BsFillBellFill, BsSearch } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
const Header = () => {
  const [scrolled, setScrolled] = useState(false)

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
    <header className={`transition duration-300 ${scrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <div className="text-2xl font-bold text-red-600 skew-x-6 cursor-pointer">
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
        <CgProfile className="w-6 h-6 cursor-pointer hover:text-[#c5c5c5] transition duration-300" />
      </div>
    </header>
  )
}

export default Header
