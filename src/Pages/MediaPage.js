import { useState, useEffect} from 'react';
import './MediaPage.css';
import bGImage from "../Assets/MediaBG.jpg";
import logo from "../Assets/Logo.png";
import CopyRight from '../Components/CopyRight';
import NavBar from '../Components/NavBar';
import VideoGrid from '../Components/VideoGrid';
import FeaturedVideo from "../Components/FeaturedVideo";
import FeaturedAlbum from '../Components/FeaturedAlbum';
import circle from '../Assets/LoadingCircle.svg';

const videoIDs = [];

function MediaPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFailed, setLoadingFailed] = useState(false);
  let fetchAttempts = 0;

  // Increments fetchAttempts
  // Puts loading message on screen
  // Try: to go to youtube and get videos
  // Catch: if - fetchAttempts is 6 or greater... output error message. set loading to false, put loading failed message on screen
  // Catch: else - recursively call self with a timeout delay that increases by 4 seconds each time based on count of fetchAttempts
  async function fetchVideoIDs() {
    fetchAttempts += 1;
    setIsLoading(true);
    try {
      console.log("attempting to run async func");
      console.log(fetchAttempts);
      const response = await fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C%20id&maxResults=50&playlistId=UUrf2dSH0iVPcD2PrKxpIQMQ&key=AIzaSyALzaX4yw2o43wfstvWbntDPyEm2kKDSXc");
      const data = await response.json();
      const actualData = data.items;
      actualData.forEach(video => {
        videoIDs.push(video.contentDetails.videoId);
      });
      setIsLoading(false);
      setLoadingFailed(false);
    } catch {
      if(fetchAttempts >= 6) {
        console.log("couldnt reach web");
        setIsLoading(false);
        setLoadingFailed(true);
        return;
      } else {
        switch(fetchAttempts) {
          case 1: 
            setTimeout(fetchVideoIDs, 3000);
            break;
          case 2: 
            setTimeout(fetchVideoIDs, 7000);
            break;
          case 3: 
            setTimeout(fetchVideoIDs, 11000);
            break;
          case 4: 
            setTimeout(fetchVideoIDs, 15000);
            break;
          case 5: 
            setTimeout(fetchVideoIDs, 19000);
            break;  
          default:
            break;
        }
      }
    }
    return;
  }

  // on render try to call fetchVideoIDs
  useEffect(()=>{
    fetchVideoIDs();
  },[]);

  return (
      <header className="App-header-Media">
        <NavBar logo = {logo}></NavBar>
        <img className="BGGifMedia" src={bGImage} alt="night sky with stars"/>
        {!isLoading && 
        <div className='MediaContent'>
          <FeaturedVideo/>
          <FeaturedAlbum/>
          <VideoGrid IdArray={videoIDs}></VideoGrid>
        </div>}
        {isLoading && <div className='LoadingCircle'><img id='Circle' src={circle} alt='Loading'></img></div>}
        {loadingFailed && <p className='Loading'>Could not reach data. Please check your network connection...</p>}
        <CopyRight></CopyRight>
    </header>
    );
}

export default MediaPage;