import Image from 'next/image'
import { Movie } from '../utils/interfaces'

const MovieThumb = ({ movie }: { movie: Movie }) => {
  const imagePath = movie?.backdrop_path
    ? movie.backdrop_path
    : movie?.poster_path
  return (
    <div className="group/thumb relative min-w-[180px] h-28 md:h-36 md:min-w-[260px] cursor-pointer tranistion duration-300 md:hover:scale-105 overflow-visible">
      <Image
        src={`https://image.tmdb.org/t/p/w500${imagePath}`}
        alt="thumbnail"
        className="object-cover rounded-sm"
        sizes="100%"
        fill
      />
      <span className="absolute font-bold transition duration-300 opacity-0 left-1 bottom-1 group-hover/thumb:opacity-100">
        {movie.title
          ? movie.title
          : movie.name
          ? movie.name
          : movie.original_title}
      </span>
    </div>
  )
}

export default MovieThumb
