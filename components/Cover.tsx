import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BsFillInfoCircleFill, BsFillPlayFill } from 'react-icons/bs'
import { randomNumber } from '../utils/calculator'
import { Movie } from '../utils/interfaces'

interface Movies {
  movies: Movie[]
}

const Cover = ({ movies }: Movies) => {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    const max = movies.length - 1
    const index = randomNumber(0, max)

    setMovie(movies[index])
  }, [])

  const imagePath = movie?.backdrop_path
    ? movie.backdrop_path
    : movie?.poster_path
  return (
    <>
      <div className="flex flex-col py-16 space-y-2 md:space-y-4 lg:space-y-6 lg:h-[65vh] lg:justify-end lg:pb-8">
        <div className="w-screen h-[95vh] -z-10 absolute top-0 left-0">
          {movie && (
            <Image
              src={`https://image.tmdb.org/t/p/original${imagePath}`}
              alt="cover image"
              sizes="100%"
              className="object-cover"
              fill
              priority
            />
          )}
        </div>
        <h1 className="text-2xl font-bold lg:text-7xl md:text-4xl">
          {movie?.title}
        </h1>
        <p className="max-w-sm text-sm md:max-w-xl lg:max-w-2xl md:text-lg lg:text-2xl">
          {movie?.overview}
        </p>
      </div>
      <div className="flex space-x-2 md:space-x-4 lg:space-x-6">
        <button className="text-black bg-white button">
          <BsFillPlayFill className="w-4 h-4 md:w-7 md:h-7" />
          Play
        </button>
        <button className="bg-gray-500/20 button ">
          More Info
          <BsFillInfoCircleFill className="w-5 h-5 md:w-8 mdLh-8" />
        </button>
      </div>
    </>
  )
}
export default Cover
