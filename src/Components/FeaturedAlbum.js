import { useState, useEffect } from 'react';
import './FeaturedAlbum.css'

function FeaturedAlbum() {

    const [albumLink, setAlbumLink] = useState(""); 
    const [albumDesc, setAlbumDesc] = useState(""); 
    const [albumSpotifyLink, setSpotifyLink] = useState(""); 

    useEffect(()=>{
        fetch("https://danielmauromusic-backend-production.up.railway.app/get-featured-album", {
            method: 'GET',
            mode: 'cors'
        }).then((response)=> {
            response.json().then((res)=>{
                setAlbumLink(res.AlbumPicLink);
                setAlbumDesc(res.AlbumDesc);
                setSpotifyLink(res.SpotifyLink);
            })
        }).catch((err)=>{
            console.log("Could not make request.");
        })
    },[]);

    return(
        <div className='FeaturedAlbumContainer'>
            <div className='Featured-Description'>
                <img className='AlbumPic' src={albumLink} alt="Newest album cover"></img>
                <p className='AlbumDesc'>
                    {albumDesc}
                </p>
                <a className='AlbumLink' href={albumSpotifyLink} target="_blank" rel="noopener noreferrer">Listen here!</a>
            </div>
        </div>
    )
}

export default FeaturedAlbum;