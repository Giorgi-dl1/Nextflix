import Image from 'next/image'
import { useEffect, useState } from 'react'
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

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={`group/thumb rounded-md overflow-hidden relative z-50 min-w-[153px] ${
        showMovie && 'hover:min-w-[300px]'
      }  cursor-pointer hover:z-[150] md:min-w-[280px] bg-[#222] h-20 md:h-36 tranistion duration-300 ${
        showMovie && 'md:hover:min-w-[360px]'
      } ${showMovie && 'hover:h-[350px]'} hover:shadow-xl`}
    >
      {showMovie ? (
        <MoreInfo movie={movie} setIsHovered={setIsHovered} />
      ) : (
        <Image
          src={`https://image.tmdb.org/t/p/w500${imagePath}`}
          alt="thumbnail"
          className="object-cover rounded-md"
          sizes="100%"
          fill
        />
      )}
    </div>
  )
}

export default RowItem
