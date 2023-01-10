import VideoPlayer from './VideoPlayer'
import { FaPlay } from 'react-icons/fa'
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'
import { VscMute, VscUnmute } from 'react-icons/vsc'
import {
  BsHandThumbsUp,
  BsHandThumbsDown,
  BsHandThumbsUpFill,
  BsHandThumbsDownFill,
} from 'react-icons/bs'
import { genre, Movie } from '../utils/interfaces'
import { useEffect, useState } from 'react'
import useStore from '../hooks/Store'
import VideoNotFound from './VideoNotFound'

interface MoreInfo {
  movie: Movie
  setIsHovered: any
}

const MoreInfo = ({ movie, setIsHovered }: MoreInfo) => {
  const [trailer, setTrailer] = useState<string | null>(null)
  const [genres, setGenres] = useState<genre[] | null>(null)
  const [muted, setMuted] = useState(true)
  const [hasToPlayCover, setHasToPlayCover] = useState(false)

  const {
    coverMuted,
    setCoverMuted,
    setModalMovie,
    addToFavorites,
    checkInFavorites,
    removeFromFavorites,
    setMovieStatus,
    checkStatus,
  } = useStore()

  const status = checkStatus(movie.id)

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
            {checkInFavorites(movie.id) ? (
              <div
                onClick={() => removeFromFavorites(movie.id)}
                className="grid group/remove relative w-[34px] border-2 border-[#555] hover:border-white transition duration-300 cursor-pointer h-[34px] text-xl text-white bg-slate-300/10 rounded-full place-content-center"
              >
                <div className="absolute z-10 hidden group-hover/remove:block w-max group-hover/remove:opacity-100 transition duration-300 opacity-0 font-semibold text-black/90 rounded text-base bg-white -top-[2.5rem] left-[50%] -translate-x-[43%] px-3 py-[2px]">
                  Remove from My List
                </div>
                <div className="absolute hidden group-hover/remove:block opacity-0 group-hover/remove:opacity-100 transition duration-300 w-3 h-3 left-[50%] -translate-x-[50%] rotate-45 bg-white -top-5" />

                <AiOutlineCheck />
              </div>
            ) : (
              <div
                onClick={() => addToFavorites(movie)}
                className="grid group/add  relative w-[34px] border-2 border-[#555] hover:border-white transition duration-300 cursor-pointer h-[34px] text-xl text-white bg-slate-300/10 rounded-full place-content-center"
              >
                <div className="absolute z-10 hidden group-hover/add:block w-max group-hover/add:opacity-100 transition duration-300 opacity-0 font-semibold text-black/90 rounded text-base bg-white -top-[2.5rem] left-[50%] -translate-x-[50%] px-3 py-[2px]">
                  Add to My List
                </div>
                <div className="absolute hidden group-hover/add:block opacity-0 group-hover/add:opacity-100 transition duration-300 w-3 h-3 left-[50%] -translate-x-[50%] rotate-45 bg-white -top-5" />

                <AiOutlinePlus />
              </div>
            )}

            <div className="flex rounded-md p-1 -translate-y-1 relative group/thumbs hover:bg-[#444] width-tranisiton w-10 hover:w-[90px]">
              <div
                onClick={() => setMovieStatus(movie.id, 'liked')}
                className="grid group/like relative w-[34px] border-2 border-white group-hover/thumbs:border-transparent group-hover/thumbs:bg-inherit hover:!bg-white/20 transition duration-300 cursor-pointer h-[34px] text-xl text-white rounded-full place-content-center"
              >
                <div className="absolute z-10 hidden group-hover/like:block w-max group-hover/like:opacity-100 transition duration-300 opacity-0 font-semibold text-black/90 rounded text-base bg-white -top-[2.5rem] left-[50%] -translate-x-[50%] px-3 py-[2px]">
                  {status === 'liked' ? 'Rated' : 'I like this'}
                </div>
                <div className="absolute hidden group-hover/like:block opacity-0 group-hover/like:opacity-100 transition duration-300 w-3 h-3 left-[50%] -translate-x-[50%] rotate-45 bg-white -top-5" />
                {status === 'liked' ? (
                  <BsHandThumbsUpFill className="w-6 h-[22px]" />
                ) : status === 'disliked' ? (
                  <>
                    <BsHandThumbsUp className="w-6 h-[22px] hidden group-hover/thumbs:block" />
                    <BsHandThumbsDownFill className="w-6 h-[22px] group-hover/thumbs:hidden" />
                  </>
                ) : (
                  <BsHandThumbsUp className="w-6 h-[22px]" />
                )}
              </div>
              <div
                onClick={() => setMovieStatus(movie.id, 'disliked')}
                className={` absolute group/dislike grid opacity-0 group-hover/thumbs:opacity-100 group-hover/thumbs:right-1 -z-10 w-[34px] border-transition cursor-pointer h-[34px] text-xl text-white bg-inherit hover:bg-white/20 rounded-full place-content-center`}
              >
                <div className="absolute z-10 hidden group-hover/dislike:block w-max group-hover/dislike:opacity-100 transition duration-300 opacity-0 font-semibold text-black/90 rounded text-base bg-white -top-[2.5rem] left-[50%] -translate-x-[50%] px-3 py-[2px]">
                  {status === 'disliked' ? 'Rated' : 'Not for me'}
                </div>
                <div className="absolute hidden group-hover/dislike:block opacity-0 group-hover/dislike:opacity-100 transition duration-300 w-3 h-3 left-[50%] -translate-x-[50%] rotate-45 bg-white -top-5" />
                {status === 'disliked' ? (
                  <BsHandThumbsDownFill className="w-6 h-[22px]" />
                ) : (
                  <BsHandThumbsDown className="w-6 h-[22px]" />
                )}
              </div>
            </div>
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
