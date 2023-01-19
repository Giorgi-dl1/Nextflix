import Image from 'next/image'
import { useEffect, useState } from 'react'
import useStore from '../hooks/Store'
import { Movie } from '../utils/interfaces'
import MoreInfo from './MoreInfo'

const RowItem = ({ movie }: { movie: Movie }) => {
  const [showMovie, setShowMovie] = useState<boolean>(false)
  const [isHovered, setIsHovered] = useState(false)
  const [timer, setTimer] = useState<any>(null)

  const imagePath = movie?.backdrop_path
    ? movie.backdrop_path
    : movie?.poster_path

  useEffect(() => {
    if (isHovered) {
      setTimer(
        setTimeout(() => {
          setShowMovie(true)
        }, 800),
      )
    } else {
      setShowMovie(false)
      clearTimeout(timer)
      setTimer(null)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isHovered])

  const showMore = () => {
    if (isHovered === false) {
      setIsHovered(true)
    }
  }
  const hideMore = () => {
    if (isHovered === true) {
      setIsHovered(false)
    }
  }

  return (
    <>
      <div
        onMouseEnter={() => showMore()}
        onMouseLeave={() => hideMore()}
        id="devRep"
        className={`group/thumb rounded-md overflow-hidden relative z-50 min-w-[153px] ${
          showMovie && '!min-w-[300px] !h-[350px] md:!min-w-[360px] '
        } ${
          isHovered && '!z-[150]'
        } cursor-pointer md:min-w-[280px] bg-[#222] h-20 md:h-36 tranistion duration-300 shadow-xl`}
      >
        {showMovie ? (
          <MoreInfo movie={movie} setIsHovered={setIsHovered} />
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/w500${imagePath}`}
            alt="thumbnail"
            priority
            className="object-cover transition delay-[800ms] rounded-md"
            sizes="100%"
            fill
          />
        )}
      </div>
      {showMovie && (
        <div
          onClick={() => hideMore()}
          onMouseLeave={() => hideMore()}
          className="z-[51] absolute -top-[200px] -bottom-[250px] -left-4 right-0"
        />
      )}
    </>
  )
}

export default RowItem
