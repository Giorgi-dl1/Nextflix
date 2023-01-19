import { useEffect, useRef, useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { Movie } from '../utils/interfaces'
import RowItem from './RowItem'

const Row = ({ movies, title }: { movies: Movie[]; title: string }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [showArrow, setShowArrow] = useState(true)
  const scrollerRef = useRef<HTMLDivElement>(null)

  const handleClick = (dir: string) => {
    if (scrollerRef.current) {
      const { scrollLeft, clientWidth } = scrollerRef.current

      const scrollTo =
        dir === 'l' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      scrollerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  const handleScroll = () => {
    if (scrollerRef.current) {
      if (scrollerRef.current.scrollLeft > 0 && !isScrolled) {
        setIsScrolled(true)
      } else if (scrollerRef.current.scrollLeft == 0 && isScrolled) {
        setIsScrolled(false)
      }
    }
  }

  useEffect(() => {
    if (
      scrollerRef.current &&
      scrollerRef.current?.scrollWidth > scrollerRef?.current?.offsetWidth
    ) {
      setShowArrow(true)
    } else {
      setShowArrow(false)
    }
  }, [])

  return (
    <div>
      <h2 className=" z-50 pl-4 mb-16 font-bold md:mb-[5rem] lg:pl-10 md:text-2xl">
        {title}
      </h2>
      <div>
        <div
          ref={scrollerRef}
          onScroll={() => handleScroll()}
          className={` pl-4
          lg:pl-10 h-[144px] py-[200px] -my-[210px] md:-my-[200px] overflow-y-hidden flex items-center space-x-2 overflow-x-scroll scrollbar-hidden  md:space-x-4`}
        >
          {movies?.map((movie) => (
            <RowItem movie={movie} key={movie.id} />
          ))}
        </div>
        {showArrow && (
          <>
            <BsChevronCompactLeft
              onClick={() => handleClick('l')}
              className={`absolute left-0 top-[50%] translate-y-[-50%] z-[200] cursor-pointer w-9 h-9 opacity-0 group-hover:opacity-100 tranistion duration-300 hover:scale-125 ${
                !isScrolled && 'hidden'
              }`}
            />
            <BsChevronCompactRight
              onClick={() => handleClick('r')}
              className="absolute right-0 top-[50%] translate-y-[-50%] z-[200] cursor-pointer w-9 h-9 opacity-0 group-hover:opacity-100 transition duration-300 hover:scale-125"
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Row
