import VideoPlayer from './VideoPlayer'
import { FaPlay } from 'react-icons/fa'
import { VscMute, VscUnmute } from 'react-icons/vsc'
import { genre, Movie } from '../utils/interfaces'
import { useEffect, useState } from 'react'
import useStore from '../hooks/Store'
import VideoNotFound from './VideoNotFound'
import Icons from './Icons'

interface MoreInfo {
  movie: Movie
  setIsHovered: any
}

const MoreInfo = ({ movie, setIsHovered }: MoreInfo) => {
  const [trailer, setTrailer] = useState<string | null>(null)
  const [genres, setGenres] = useState<genre[] | null>(null)
  const [muted, setMuted] = useState(true)
  const [hasToPlayCover, setHasToPlayCover] = useState(false)

  const { coverMuted, setCoverMuted, setModalMovie } = useStore()

  useEffect(() => {
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_KEY
        }&language=en-US&append_to_response=videos`,
      ).then((response) => response.json())
      if (data?.videos.results.length) {
        const index = data.videos.results.findIndex(
          (element: { type: string }) => element.type === 'Trailer',
        )
        if (index !== -1) {
          setTrailer(data.videos?.results[index]?.key)
        } else {
          setTrailer(data.videos?.results[0]?.key)
        }
      } else {
        setTrailer('not found')
      }
      setGenres(data?.genres)
    }
    fetchMovie()
  }, [movie])

  const clickHandler = () => {
    if (!coverMuted || hasToPlayCover) {
      setHasToPlayCover(!hasToPlayCover)
      setCoverMuted(!coverMuted)
    }
    setMuted(!muted)
  }

  const openModal = () => {
    const modalData = { ...movie, genres, trailer }
    if (!coverMuted) {
      setCoverMuted(true)
    }
    setIsHovered(false)
    setModalMovie(modalData)
    window.scrollTo(0, 0)
  }

  return (
    <>
      {trailer !== 'not found' ? (
        <VideoPlayer url={trailer} muted={muted} />
      ) : (
        <div className="absolute cursor-pointer w-full -z-50 h-[52%] overflow-hidden">
          <VideoNotFound />
        </div>
      )}
      <div className="p-5 relative mt-[56%] md:mt-[50%]">
        <div
          onClick={() => clickHandler()}
          className="absolute text-white opacity-20 hover:opacity-100 left-5 -top-8 md:-top-12 grid w-[34px] border-2 border-white transition duration-300 cursor-pointer h-[34px] text-xl hover:text-white bg-[#333] rounded-full place-content-center"
        >
          {muted ? <VscMute /> : <VscUnmute />}
        </div>
        <div>
          <div className="flex gap-3">
            <div
              onClick={() => openModal()}
              className="grid w-[34px] h-[34px] text-black transition duration-300 bg-white rounded-full cursor-pointer hover:bg-white/80 place-content-center"
            >
              <FaPlay />
            </div>

            <Icons movie={movie} />
          </div>
        </div>
        <div className="mt-2 text-[18px] font-bold group-hover/thumbs:translate-y-1">
          {movie.title || movie.original_name}
        </div>
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {genres?.map((genre: genre, index: number) => (
            <div key={genre.id} className="flex items-center gap-1.5">
              <div>{genre.name}</div>
              {index < genres.length - 1 && (
                <div className="w-2 h-2 rounded-full bg-[#979797] " />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MoreInfo
