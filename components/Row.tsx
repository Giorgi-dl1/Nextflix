import { useRef, useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { Movie } from '../utils/interfaces'
import RowItem from './RowItem'

const Row = ({ movies, title }: { movies: Movie[]; title: string }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (dir: string) => {
    setIsScrolled(true)
    if (scrollerRef.current) {
      const { scrollLeft, clientWidth } = scrollerRef.current

      const scrollTo =
        dir === 'l' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      scrollerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div
      className={` row-wrapper transition-none group ${
        isHovered ? 'row-wrapper' : 'mb-[25px]'
      }`}
    >
      <h2 className="pl-4 mb-4 font-bold lg:pl-16 md:text-2xl">{title}</h2>
      <div className="relative">
        <div
          ref={scrollerRef}
          className={`${isHovered ? 'items-wrapper' : ''} relative pl-4
          lg:pl-16 transition-none flex h-full items-center space-x-2 overflow-x-scroll scrollbar-hidden md:space-x-4`}
        >
          {movies.map((movie) => (
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <RowItem movie={movie} key={movie.id} />
            </div>
          ))}
        </div>
        <BsChevronCompactLeft
          onClick={() => handleClick('l')}
          className={`absolute left-0 top-[50%] translate-y-[-50%] z-[100] cursor-pointer w-9 h-9 opacity-0 group-hover:opacity-100 tranistion duration-300 hover:scale-125 ${
            !isScrolled && 'hidden'
          }`}
        />
        <BsChevronCompactRight
          onClick={() => handleClick('r')}
          className="absolute right-0 top-[50%] translate-y-[-50%] z-[100] cursor-pointer w-9 h-9 opacity-0 group-hover:opacity-100 transition duration-300 hover:scale-125"
        />
      </div>
    </div>
  )
}

export default Row
