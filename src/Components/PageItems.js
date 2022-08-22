import {useLocation} from 'react-router-dom'
import "./PageItems.css"

function PageItems(props){
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
        <a className="PageItem" href={props.PageRefs} style={{color: color}}>{props.PageName}</a>
    );
}

export default PageItems