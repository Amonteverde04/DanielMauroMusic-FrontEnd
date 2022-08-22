import "./VideoPlayer.css"

function VideoPlayer(props) {
    const srcString = `https://www.youtube-nocookie.com/embed/${props.VideoID}`;
    return (
            <div className="VideoPlayerContainer">
                <iframe className="Youtube" src={srcString} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
            </div>
    );
  }
  
  export default VideoPlayer;