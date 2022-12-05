import React, {useEffect, useState} from 'react';
import './FeaturedVidMenu.css';

function FeaturedVidMenu() {
    const [vidLink, setVidLink] = useState(""); 
    const [link, setLink] = useState("");


    useEffect(()=>{
        fetch("https://danielmauromusic-backend-production.up.railway.app/get-featured-vid", {
            method: 'GET',
            mode: 'cors'
        }).then((response)=> {
            response.json().then((res)=>{
                setVidLink(res.VideoID);
            })
        }).catch((err)=>{
            console.log("Could not make request.");
        })
    },[]);

    function handleSubmit(e) {
        e.preventDefault(); // prevent page from reloading... reloading breaks react app
        fetch(`https://danielmauromusic-backend-production.up.railway.app/put-featured-vid`, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({link})
        }).then(res=>{
            setVidLink(link);
            setLink("");
        }).catch(err=>{
            console.log("Could not make request.");
        })
      }
    
    return (
        <div className='FeaturedVidContainer'>
            <form className='FeaturedVidForm' onSubmit={handleSubmit}>
                <div className='LabelContainer'>
                    <label className='FeaturedVidLabel'>Featured Video Link</label><br></br>
                </div>
                <input className='FeaturedVidInput' placeholder={vidLink} type='text' value={link} onChange={(e)=>{setLink(e.target.value)}} required></input>
                <input className='FeaturedVidSubmit' type='submit' value="Update Featured Video"></input>
            </form>
        </div>
    )
}

export default FeaturedVidMenu;