import { useEffect, useState } from 'react';
import './ShowsPage.css';
import bGImage from "../Assets/ShowsBG.jpg";
import logo from "../Assets/Logo.png";
import CopyRight from '../Components/CopyRight';
import NavBar from '../Components/NavBar';
import circle from '../Assets/LoadingCircle.svg';
import ShowItem from '../Components/ShowItem';

function ShowsPage() {
    const [isLoading, setIsLoading] = useState(true);

    const [showsData, setShowsData] = useState({
        showNumber: [],
        venueName: [],
        venueAddress: [],
        date:[],
        time: [],
        ticketLink: []
    });

    useEffect(()=>{
        fetch("https://danielmauromusic-backend.herokuapp.com/get-shows", {
            method: 'GET',
            mode: 'cors'
        }).then((response)=> {
            response.json().then((res)=>{
                const showObject = {
                    showNumber: [],
                    venueName: [],
                    venueAddress: [],
                    date:[],
                    time: [],
                    ticketLink: []
                }
                for(let i = 0; i < res.length; i++) {
                    showObject.showNumber[i] = i+1;
                    showObject.venueName[i] = res[i].VenueName;
                    showObject.venueAddress[i] = res[i].VenueAddress;
                    showObject.date[i] = res[i].Date;
                    showObject.time[i] = res[i].Time;
                    showObject.ticketLink[i] = res[i].Ticketlink;
                }
                setShowsData(showObject);
                setIsLoading(false);
            })
        }).catch((err)=>{
            console.log("Could not make request.");
        })
    });

    function shows() {
        const showTable = [];
        for(let i = 0; i < showsData.showNumber.length; i++) {
          showTable.push(
            <ShowItem key={i} Venue={showsData.venueName[i]} Address={showsData.venueAddress[i]} Dates={showsData.date[i]} EventTime={showsData.time[i]} TicketLink={showsData.ticketLink[i]}/>
          );
        }
        return showTable;
    }

    return (
        <header className="App-header-Shows">
          <NavBar className="Nav" logo = {logo}></NavBar>
          <div className="MovieScreen">
            <ul className="ListContainer">
              {!isLoading && shows()}
              {isLoading && <div className='LoadingCircleShows'><img id='Circle' src={circle} alt='Loading'></img></div>}
            </ul>
          </div>
          <img className="Background" src={bGImage} alt="Swirley background"></img>
          <CopyRight></CopyRight>
      </header>
    );
}

export default ShowsPage;