import VideoPlayer from "./VideoPlayer";
import './VideoGrid.css';

function VideoGrid(props) {
    function renderYoutubeVideos() {
        let IDs = [];
        let key = "";
        for(let i = 0; i < props.IdArray.length; i++) {
          key = `video ${i}`
          IDs.push(<VideoPlayer key={key} className="Video" VideoID={props.IdArray[i]}></VideoPlayer>)
        }
        return IDs;
      }

    return(
    <div className="GridContainer">
        {renderYoutubeVideos()}
    </div>
    )
}

export default VideoGrid;