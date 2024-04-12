const VideoGrid = ({ videos }) => {
  const gridCols = videos.length === 1 ? '1fr' : videos.length === 2 ? '1fr 1fr' : '1fr 1fr';
  const gridRows = videos.length > 2 ? '1fr 1fr' : '1fr';

  return (
    <div
      className="w-full h-full"
      style={{
        display: 'grid',
        gridTemplateColumns: gridCols,
        gridTemplateRows: gridRows,
        gap: '10px',
        padding: '10px'
      }}
    >
      {videos.map((video, index) => (
        <div key={index} className="bg-black">
          <video
            autoPlay
            playsInline
            muted={index === 0} // Assuming the first video might be the local user who is muted
            style={{ width: '100%', height: '100%' }}
            ref={video.ref}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
