import ReactPlayer from 'react-player/lazy'

interface player {
  url: string | null
  muted: boolean
}

const VideoPlayer = ({ url, muted }: player) => {
  return (
    <div className="absolute cursor-pointer w-full -z-50 h-[52%] overflow-hidden">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${url}`}
        width="100%"
        height="200%"
        config={{
          youtube: { playerVars: { origin: 'https://www.youtube.com' } },
        }}
        style={{
          position: 'absolute',
          top: '-50.3%',
          left: '0',
        }}
        loop={true}
        playing={true}
        muted={muted}
      />
    </div>
  )
}

export default VideoPlayer
