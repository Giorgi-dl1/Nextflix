import { useEffect, useState } from 'react'
import { randomNumber } from '../utils/utilities'
import { Movie } from '../utils/interfaces'
import CoverContent from './CoverContent'

interface Movies {
  movies: Movie[]
}
const Cover = ({ movies }: Movies) => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showDesc, setShowDesc] = useState(true)

  useEffect(() => {
    const max = movies.length - 1
    const index = randomNumber(0, max)

    setMovie(movies[index])
    setShowDesc(true)

    const timer = setTimeout(() => {
      setShowDesc(false)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  const imagePath = movie?.backdrop_path
    ? movie.backdrop_path
    : movie?.poster_path
  return (
    <div className="relative">
      {movie && <CoverContent movie={movie} showDesc={showDesc} />}
    </div>
  )
}
export default Cover
