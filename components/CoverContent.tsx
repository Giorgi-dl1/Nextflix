import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Movie } from '../utils/interfaces'
import { BsFillInfoCircleFill, BsFillPlayFill } from 'react-icons/bs'
import { VscMute, VscUnmute } from 'react-icons/vsc'
import useStore from '../hooks/Store'
import Image from 'next/image'

const CoverContent = ({
  movie,
  showDesc,
}: {
  movie: Movie
  showDesc: boolean
}) => {
  const [trailer, setTrailer] = useState<string | null>(null)
  const [tagline, setTagline] = useState(null)
  const [genres, setGenres] = useState(null)

  const { coverMuted, setCoverMuted, setModalMovie } = useStore()

  const imagePath = movie?.backdrop_path
    ? movie.backdrop_path
    : movie?.poster_path

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
      if (data.tagline) {
        setTagline(data.tagline)
      }
      setGenres(data?.genres)
    }
    fetchMovie()
  })

  const openModal = () => {
    const modalData = { ...movie, genres, trailer }
    if (!coverMuted) {
      setCoverMuted(true)
    }
    setModalMovie(modalData)
    window.scrollTo(0, 0)
  }

  return (
    <div className="w-screen overflow-hidden h-[30vh] md:h-[70vh] lg:h-[95vh] relative">
      {movie && trailer !== 'not found' ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="110%"
          height="150%"
          config={{
            youtube: { playerVars: { origin: 'https://www.youtube.com' } },
          }}
          style={{
            transform: 'translate(-5%,-17%)',
            zIndex: -2,
          }}
          loop={true}
          muted={coverMuted}
          playing={true}
        />
      ) : (
        <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
          <Image
            fill
            alt="cover"
            sizes="100%"
            src={`https://image.tmdb.org/t/p/w500${imagePath}`}
            className="object-cover"
          />
        </div>
      )}
      <div className="absolute bottom-[25%] left-4 lg:left-10">
        <h1
          className={`${
            showDesc
              ? 'text-2xl md:text-4xl lg:text-6xl z-60'
              : 'text-xl md:text-3xl lg:text-4xl'
          } font-transition max-w-sm md:max-w-xl lg:max-w-2xl`}
        >
          {movie.title}
        </h1>
        <p
          className={`h-transition ${
            showDesc ? '' : 'hide'
          } max-w-sm text-[12px] md:text-base md:max-w-xl lg:max-w-2xl`}
        >
          {tagline || movie?.overview}
        </p>

        <div className="relative z-50 flex items-center justify-between w-screen px-4 mt-2 -translate-x-4 md:mt-4 lg:-translate-x-10 lg:px-10">
          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
            <button className="text-black bg-white cursor-auto button hover:opacity-100">
              <BsFillPlayFill className="w-3 h-3 md:w-6 md:h-6" />
              Play
            </button>

            <button
              onClick={() => openModal()}
              className="bg-gray-500/20 button "
            >
              More Info
              <BsFillInfoCircleFill className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </div>
          <div
            onClick={() => setCoverMuted(!coverMuted)}
            className="z-50 text-white md:text-2xl grid w-[34px] md:w-[54px] -translate-x-4 border-2 border-white transition duration-300 cursor-pointer h-[34px] md:h-[54px] text-xl bg-[#666]/20 hover:bg-[#777]/40 rounded-full place-content-center"
          >
            {coverMuted ? <VscMute /> : <VscUnmute />}
          </div>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 " />
    </div>
  )
}

export default CoverContent
