import {
  BsHandThumbsUp,
  BsHandThumbsDown,
  BsHandThumbsUpFill,
  BsHandThumbsDownFill,
} from 'react-icons/bs'
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'
import useStore from '../hooks/Store'
import { Movie } from '../utils/interfaces'

const Icons = ({ movie }: { movie: Movie }) => {
  const {
    setMovieStatus,
    checkStatus,
    addToFavorites,
    checkInFavorites,
    removeFromFavorites,
  } = useStore()
  const status = checkStatus(movie.id)

  return (
    <>
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
    </>
  )
}

export default Icons
