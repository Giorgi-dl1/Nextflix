import { MdOutlineError } from 'react-icons/md'

const VideoNotFound = () => {
  return (
    <div className="flex flex-col bg-[#222] items-center justify-center w-full h-full bg-red ">
      <MdOutlineError className="w-6 h-6 text-red-500 md:w-8 md:h-8" />
      <span>Video not found</span>
    </div>
  )
}

export default VideoNotFound
