import { useEffect, useState } from 'react';
import {SERVER_URL} from '../Constants/Globals';
import './FeaturedAlbumMenu.css';

function FeaturedAlbumMenu() {
    const [featAlbumPlaceHolder, setFeatAlbumPlaceHolder] = useState(
        {
            AlbumLink: "",
            AlbumDesc: "",
            AlbumSpotifyLink: ""
        }
    );
    const [albumLink, setAlbumLink] = useState("");
    const [albumDesc, setAlbumDesc] = useState("");
    const [albumSpotifyLink, setAlbumSpotifyLink] = useState("");

    useEffect(()=>{
        fetch(`${SERVER_URL}/get-featured-album`, {
            method: 'GET',
            mode: 'cors'
        }).then((response)=> {
            response.json().then((res)=>{
                setFeatAlbumPlaceHolder(
                    {
                        AlbumLink: res.AlbumPicLink,
                        AlbumDesc: res.AlbumDesc,
                        AlbumSpotifyLink: res.SpotifyLink
                    });
            })
        }).catch((err)=>{
            console.log("Could not make request.");
        })
    },[]);

    function updateFeaturedAlbum(e) {
        e.preventDefault();
        fetch(`${SERVER_URL}/put-featured-album`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({albumLink,albumDesc,albumSpotifyLink})
          }).then(res=>{
                setFeatAlbumPlaceHolder(
                    {
                        AlbumLink: albumLink,
                        AlbumDesc: albumDesc,
                        AlbumSpotifyLink: albumSpotifyLink
                    });
                setAlbumLink("");
                setAlbumDesc("");
                setAlbumSpotifyLink("");
          }).catch(err=>{
              console.log("Could not make request.");
          })
    }

    return (
        <div className='FeaturedAlbumMenuContainer'>
            <label id='FormHeading'>Featured Album</label><br></br>
            <form className='FeaturedAlbumForm' onSubmit={updateFeaturedAlbum}>
                <label id='FeaturedAlbumLabel'>Image URL:</label><br></br>
                <input id='FeaturedAlbumInput' type='text' placeholder={featAlbumPlaceHolder.AlbumLink} value={albumLink} onChange={(e)=>{setAlbumLink(e.target.value)}} required></input><br></br>
                <label id='FeaturedAlbumLabel'>Album Description:</label><br></br>
                <input id='FeaturedAlbumInput' type='text' placeholder={featAlbumPlaceHolder.AlbumDesc} value={albumDesc} onChange={(e)=>{setAlbumDesc(e.target.value)}} required></input><br></br>
                <label id='FeaturedAlbumLabel'>Spotify Link:</label><br></br>
                <input id='FeaturedAlbumInput' type='text' placeholder={featAlbumPlaceHolder.AlbumSpotifyLink} value={albumSpotifyLink} onChange={(e)=>{setAlbumSpotifyLink(e.target.value)}} required></input>
                <input className='FeaturedVidSubmit' type='submit' value="Update Featured Album"></input>
            </form>
        </div>
    )
}

export default FeaturedAlbumMenu;