import { useEffect, useState } from "react";
import "./ShowItem.css"

function ShowItem(props) {
    const [ticketButton, setTicketButton] = useState("");
    const [ticketButtonLink, setTicketButtonLink] = useState("");

    useEffect(()=>{
        tickets();
    })

    function tickets() {
        if(props.TicketLink === "" || props.TicketLink === " ") {
            setTicketButton("DM @danielmauromusic!");
            setTicketButtonLink("https://www.instagram.com/danielmauromusic/?hl=en");
            return ticketButton;
        } else {
            setTicketButtonLink(props.TicketLink);
            setTicketButton("Purchase tickets!");
            return ticketButton;
        }
    }


    return(
        <li className="ListItem">
                <p className="VenueName">{props.Venue}</p>
                <p className="Address">{props.Address}</p>
                <p>{props.Dates}</p>
                <p>Doors open: {props.EventTime}</p>
                <button className="PurchaseButton"><a className="PurchaseLink" href={ticketButtonLink}>{ticketButton}</a></button>
        </li>
    );
}

export default ShowItem;