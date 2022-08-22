import {useLocation} from 'react-router-dom'
import "./CopyRight.css"

function CopyRight() {
    // gets path name, based on path name change color of copyright text
    var location = useLocation();
    let color;
    switch(location.pathname){
        case "/":
            color = "#ffc1bb";
            break;
        case "/Merch":
            color = "#ffc1bb";
            break;
        case "/Shows":
            color = "#f7f0a7";
            break;
        case "/Media":
            color = "#f7f0a7";
            break;
        default:
            color = "#ffc1bb";
            break;
    }
    
    return (
            <div className="CopyRightContainer">
                <h2 style={{color: color}}>© 2022 DANIEL MAURO MUSIC ENTERTAINMENT</h2>
            </div>
    );
  }
  
  export default CopyRight;