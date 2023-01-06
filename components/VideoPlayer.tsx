import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { Movie } from '../utils/interfaces'

interface player {
  url: string | null
  muted: boolean
}

const VideoPlayer = ({ url, muted }: player) => {
  return (
    <div className="absolute w-full h-[52%] overflow-hidden">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${url}`}
        width="100%"
        height="200%"
        style={{
          position: 'absolute',
          top: '-50.3%',

          left: '0',
        }}
        playing={true}
        muted={muted}
      />
    </div>
  )
}

export default VideoPlayer
