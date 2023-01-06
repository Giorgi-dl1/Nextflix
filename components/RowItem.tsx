import Image from 'next/image'
import { useState } from 'react'
import { Movie } from '../utils/interfaces'
import MoreInfo from './MoreInfo'

const RowItem = ({ movie }: { movie: Movie }) => {
  const [showMovie, setShowMovie] = useState<boolean>(false)
  const imagePath = movie?.backdrop_path
    ? movie.backdrop_path
    : movie?.poster_path
  return (
    <div
      onMouseEnter={() => setShowMovie(true)}
      onMouseLeave={() => setShowMovie(false)}
      className="group/thumb  rounded-md overflow-hidden relative z-40 min-w-[153px] hover:min-w-[300px] hover:z-50 md:min-w-[280px] bg-[#222] h-20 md:h-36 tranistion duration-300 md:hover:min-w-[360px] hover:h-[350px] hover:shadow-xl"
    >
      {showMovie ? (
        <MoreInfo movie={movie} />
      ) : (
        <Image
          src={`https://image.tmdb.org/t/p/w500${imagePath}`}
          alt="thumbnail"
          className="object-cover rounded-sm"
          sizes="100%"
          fill
        />
      )}
    </div>
  )
}

export default RowItem
