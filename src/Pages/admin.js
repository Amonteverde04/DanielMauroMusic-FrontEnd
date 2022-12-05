
import './admin.css';
import NavBarAdmin from '../AdminComponents/NavbarAdmin';
import ShowsMenu from '../AdminComponents/ShowsMenu';
import FeaturedVidMenu from '../AdminComponents/FeaturedVidMenu';
import FeaturedAlbumMenu from '../AdminComponents/FeaturedAlbumMenu';
import { useState } from 'react';

function AdminPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [hidden, setHidden] = useState("hidden");

    async function logIn(e) {
        e.preventDefault();
        await fetch("https://danielmauromusic-backend-production.up.railway.app/enter-admin", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "User": user,
                "Password": password
            })
        }).then((response)=>{
            response.json().then((res)=>{
                if(res[0]) {
                    setHidden("hidden");
                    setLoggedIn(true);
                } else {
                    setHidden("");
                }
        })
        }).catch((err)=>{
            console.log('Could not make request!');
        });
    }

    return (
        <header className="App-header-Admin">
            <NavBarAdmin/>
            {!loggedIn && 
            <div className='LogInContainer'>
                    <h1 id='LogInGreeting'>Welcome to the admin portal</h1>
                    <p className={'ErrorLogIn ' + hidden}>Wrong credentials supplied...</p>
                    <form className='LogInForm' onSubmit={logIn}>
                        <label>Username</label><br></br>
                        <input id='LogInInput' type='text' value={user} onChange={(e)=>{setUser(e.target.value);}} required></input>
                        <br></br>
                        <label>Password</label><br></br>
                        <input id='LogInInput' type='password' value={password} onChange={(e)=>{setPassword(e.target.value);}} required></input>
                        <br></br>
                        <button className='LogInSubmit'>Log in</button>
                    </form>
            </div>
            }
            {loggedIn && 
                <div className='OutsideContainer'>
                    <ShowsMenu/>
                    <FeaturedVidMenu/>
                    <FeaturedAlbumMenu/>
                </div>
            }
        </header>
    );
}

export default AdminPage;