import { useState } from 'react'
import ReactPlayer from 'react-player'
import { genre } from '../utils/interfaces'
import { IoMdClose } from 'react-icons/io'
import { BsFillPlayFill } from 'react-icons/bs'
import { VscMute, VscUnmute } from 'react-icons/vsc'
import useStore from '../hooks/Store'
import VideoNotFound from './VideoNotFound'
import Icons from './Icons'

const Modal = () => {
  const [muted, setMuted] = useState(true)

  const { modalMovie: movie, setModalMovie } = useStore()

  return movie ? (
    <>
      <div className="absolute scrollbar-hidden z-[300] !top-7 left-0 right-0  mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
        <button
          className="modalButton absolute right-5 top-5 grid place-content-center rounded !z-[401] h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          onClick={() => setModalMovie(null)}
        >
          <IoMdClose className="w-6 h-6" />
        </button>

        <div className="relative  pt-[56.25%]">
          <div className="absolute top-0 bottom-0 left-0 right-0 z-[400]" />

          {movie.trailer !== 'not found' ? (
            <div className="w-full overflow-hidden max-h-[570px] ">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${movie.trailer}`}
                config={{
                  youtube: {
                    playerVars: { origin: 'https://www.youtube.com' },
                  },
                }}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: '0', left: '0' }}
                playing
                loop
                muted={muted}
              />
            </div>
          ) : (
            <div className="absolute top-0 bottom-0 left-0 right-0 min-h-[570px]">
              <VideoNotFound />
            </div>
          )}
          <div className="absolute flex items-center justify-between w-full px-10 bottom-10">
            <div className="flex items-center space-x-4">
              <button className="text-base text-black bg-white button">
                <BsFillPlayFill className="w-4 h-4 md:w-6 md:h-6" />
                Play
              </button>
              <div className="flex gap-2 mt-2 z-[401]">
                <Icons movie={movie} />
              </div>
            </div>
            <button
              className="modalButton z-[401]"
              onClick={() => setMuted(!muted)}
            >
              {muted ? (
                <VscMute className="w-6 h-6" />
              ) : (
                <VscUnmute className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {(movie!.vote_average * 10).toFixed(2)}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col font-light gap-x-10 gap-y-4 md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {movie.genres?.map((genre: genre, index: number) => (
                    <div key={genre.id} className="flex items-center gap-1.5">
                      <div>{genre.name}</div>
                      {index < movie.genres.length - 1 && (
                        <div className="w-2 h-2 rounded-full bg-[#979797] " />
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{' '}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{' '}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => setModalMovie(null)}
        className="absolute top-0 -bottom-16 left-0 right-0 bg-black/20 z-[299]"
      />
    </>
  ) : null
}

export default Modal
