import React, {useState} from 'react'
import './HomePage.css';
import logo from "../Assets/Logo.png";
import CopyRight from '../Components/CopyRight';
import NavBar from '../Components/NavBar';
import Arrow from '../Assets/upArrow.svg'

function HomePage() {
  const [ID, setID] = useState("hidden");
  const [ID2, setID2] = useState("");
  const [flipped, setFlipped] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({
    error:"hidden",
    success:"hidden"
  });

  function hideNews() {
    if(ID === "hidden") {
      setID("");
      setID2("hidden");
      setFlipped("flip");
    } else {
      setID("hidden");
      setID2("");
      setFlipped("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevent page from reloading... reloading breaks react app
    console.log(name, email);
    fetch(`https://danielmauromusic-backend.herokuapp.com/post-mailing-list`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({name,email}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res=>{
      setMessage({
        error:"hidden",
        success: ""
      });
      setName("");
      setEmail("");
    }).catch(err=>{
      setMessage({
        error:"",
        success: "hidden"
      });
      setName("");
      setEmail("");
    })
  }

    return (
        <header className="App-header">
          <NavBar logo = {logo}></NavBar>
          <img className="BackgroundGif" src="https://media.giphy.com/media/cRd3YuaZmlXFiiNIcY/giphy.gif" alt="Background video of live concert."/>
          <form className="NewsLetter" id={ID} onSubmit={handleSubmit}>
              <p className="ErrMessage" id={message.error}>There was an error sending your information.<br></br> Please reload the page and try again!</p>
              <p className="SuccMessage" id={message.success}>Your information has successfully been sent!</p>
              <p className="Details">Enter your email for exclusive news from Daniel!</p>
              <input type="text" className="InputBox" placeholder='First Name' name='Name' value={name} onChange={(e)=>{setName(e.target.value)}} required></input><br></br>
              <input type="email" className="InputBox" placeholder='yourEmail@email.com' name='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required></input><br></br>
              <input className='SubmitButton' type='submit' value="Sign up for mailing list!"></input>
            </form>
          <div className='NewsButtonContainer' id={flipped}>
            <button className="NewsButton" type="button" onClick={hideNews}><img src={Arrow} alt="Arrow Button"/>
              <label className="ButtonLabel" id={ID2}>Click Me!</label>
            </button>
          </div>
          <CopyRight></CopyRight>
        </header>
    );
}

export default HomePage;