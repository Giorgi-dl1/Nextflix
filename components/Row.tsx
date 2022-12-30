import { useRef, useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { Movie } from '../utils/interfaces'
import MovieThumb from './MovieThumb'

const Row = ({ movies, title }: { movies: Movie[]; title: string }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const scrollerRef = useRef<HTMLDivElement>(null)

  const handleClick = (dir: string) => {
    setIsScrolled(true)

    const { scrollLeft, clientWidth } = scrollerRef.current

    const width =
      dir === 'r' ? scrollLeft + clientWidth : scrollLeft - clientWidth

    scrollerRef.current.scrollTo({ left: width, behavior: 'smooth' })
  }

  return (
    <div className="group">
      <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex h-full space-x-2 overflow-x-scroll scrollbar-hidden md:space-x-4 md:py-2 md:px-2 md:-mx-2"
        >
          {movies.map((movie) => (
            <MovieThumb movie={movie} key={movie.id} />
          ))}
        </div>
        <BsChevronCompactLeft
          onClick={() => handleClick('l')}
          className={`absolute left-0 top-[50%] translate-y-[-50%] cursor-pointer w-9 h-9 opacity-0 group-hover:opacity-100 tranistion duration-300 hover:scale-125 ${
            !isScrolled && 'hidden'
          }`}
        />
        <BsChevronCompactRight
          onClick={() => handleClick('r')}
          className="absolute right-0 top-[50%] translate-y-[-50%] cursor-pointer w-9 h-9 opacity-0 group-hover:opacity-100 transition duration-300 hover:scale-125"
        />
      </div>
    </div>
  )
}

export default Row
