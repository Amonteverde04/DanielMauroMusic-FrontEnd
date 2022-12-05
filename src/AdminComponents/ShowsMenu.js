import { useEffect, useState } from 'react';
import './ShowsMenu.css';
import plus from '../Assets/plus.svg';
import x from '../Assets/x.svg';
import circle from '../Assets/LoadingCircle.svg';
import back from '../Assets/back.svg';

function ShowsMenu() {
    const [showsData, setShowsData] = useState({
        showNumber: [],
        venueName: [],
        venueAddress: [],
        date:[],
        time: [],
        ticketLink: []
    });

    const [newName, setNewName] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");
    const [newLink, setNewLink] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [addPrompt, setAddPrompt] = useState(false);
    const [addButton, setAddButton] = useState({
        button: plus,
    });

    useEffect(()=>{
        getShows();
    },[]);

    function getShows() {
        fetch("https://danielmauromusic-backend-production.up.railway.app/get-shows", {
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
    }

    function shows() {
        const showTable = [];
        for(let i = 0; i < showsData.showNumber.length; i++) {
            showTable.push(
                <tbody key={i} id='TableBody'>
                    <tr className='ShowTableItem'>
                        <th>Show {i+1}</th>
                        <td>{showsData.venueName[i]}</td>
                        <td>{showsData.venueAddress[i]}</td>
                        <td>{showsData.date[i]}</td>
                        <td>{showsData.time[i]}</td>
                        <td>{showsData.ticketLink[i]}</td>
                        <td className='TrashButtonContainer'>
                            <button className='TrashButton' onClick={()=>{deleteShow(i)}} ><img className='Trash' src={x} alt='Remove Show'></img></button>
                        </td>
                    </tr>
                </tbody>
            );
        }
        return showTable;
    }

    function deleteShow(id) {
        fetch("https://danielmauromusic-backend-production.up.railway.app/delete-show", {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "VenueName": showsData.venueName[id],
                "VenueAddress": showsData.venueAddress[id],
                "Date": showsData.date[id],
                "Ticketlink": showsData.ticketLink[id],
                "Time": showsData.time[id]
            })
        }).then(res=>{
            getShows();
        }).catch(err=>{
            console.log("Could not make request.");
        })
    }

    function showAddPrompt() {
        switch(addButton.button){
            case plus:
                setIsLoading(false);
                setAddPrompt(true);
                setAddButton({button: back});
                break;
            case back:
                setIsLoading(false);
                setAddPrompt(false);
                setAddButton({button: plus});
                break;
            default:
                break;
        }
    }

    async function addNewShow(e) {
        e.preventDefault();
        await fetch("https://danielmauromusic-backend-production.up.railway.app/post-show", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "VenueName": newName,
                "VenueAddress": newAddress,
                "Date": newDate,
                "Ticketlink": newLink,
                "Time": newTime
            })
        }).then(res=>{
            console.log("Show added.")
        }).catch(err=>{
            console.log("Could not make request.");
        })
        // cleanse inputs
        setNewName("");
        setNewAddress("");
        setNewDate("");
        setNewTime("");
        setNewLink("");
        // reload
        
        getShows();
        // Close add show prompt
        showAddPrompt();
    }

    return (
        <div className='ShowsMenuContainer'>
            <table className='ShowsTable'>
                <thead id='TableHead'>
                    <tr>
                        <td>
                            Shows
                        </td>
                    </tr>
                </thead>
                {!isLoading && !addPrompt && shows()}
                {!isLoading && addPrompt && 
                <tbody><tr><td><div className='AddShow'>
                    <form onSubmit={addNewShow}>
                        <label>Venue Name</label><br></br>
                        <input id='ShowInput' type='text' placeholder='Dennys' value={newName} onChange={(e)=>{setNewName(e.target.value)}} required></input><br></br>
                        <label>Venue Address</label><br></br>
                        <input id='ShowInput' type='text' placeholder='255 Example Street, ExampleTown, NY 11738' value={newAddress} onChange={(e)=>{setNewAddress(e.target.value)}} required></input><br></br>
                        <label>Date</label><br></br>
                        <input id='ShowInput' type='text' placeholder='09/30/2022' value={newDate} onChange={(e)=>{setNewDate(e.target.value)}} required></input><br></br>
                        <label>Tickets Link</label><br></br>
                        <input id='ShowInput' type='text' placeholder='https://ticketseller.com' value={newLink} onChange={(e)=>{setNewLink(e.target.value)}}></input><br></br>
                        <label>Time</label><br></br>
                        <input id='ShowInput' type='text' placeholder='9:00pm' value={newTime} onChange={(e)=>{setNewTime(e.target.value)}} required></input><br></br>
                        <button className='ShowSubmit'>Add Show</button>
                    </form>
                </div></td></tr></tbody>}
                {isLoading && <tbody><tr><td><div className='LoadingCircle'><img id='Circle' src={circle} alt='Loading'></img></div></td></tr></tbody>}
                <tfoot className='TableFoot'>
                    <tr className='ShowTableFootButton'>
                        <td className='PlusButtonContainer'>
                            <button className='PlusButton' onClick={showAddPrompt}><img className='Plus' src={addButton.button} alt='Add Show'></img></button>                            
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default ShowsMenu;