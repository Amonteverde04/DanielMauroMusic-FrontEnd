import { useEffect, useState } from 'react';
import './FeaturedVideo.css';

function FeaturedVideo() {
    const [vidLink, setVidLink] = useState(""); 

    useEffect(()=>{
        fetch("https://danielmauromusicbackend.onrender.com/get-featured-vid", {
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

    return(
        <div className='FeaturedOuterContainer'>
            <div className='FeaturedContainer'>
                <iframe className="Featured-Youtube" src={"https://www.youtube-nocookie.com/embed/" + vidLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        </div>
    );
}

export default FeaturedVideo;