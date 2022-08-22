import './NavBar.css';
import PageItems from './PageItems';
import spotify from "./ComponentAssets/spotify.svg";
import apple from "./ComponentAssets/apple.svg";
import instagram from "./ComponentAssets/instagram.svg";
import youtube from "./ComponentAssets/youtube.svg";
import amazon from "./ComponentAssets/amazon.svg";
import tiktok from "./ComponentAssets/tiktok.svg";

function NavBar(props) {
  let pages = ["Merch", "Shows", "Media"];
  let pageRef = ["/Merch", "/Shows", "/Media"];
  // add to pages array to add more narbar page links
  function renderPageLinks() {
    let links = [];
    for(let i = 0; i < pages.length; i++) {
      links.push(<PageItems id='Item' key={pageRef[i]} PageRefs={pageRef[i]} PageName={pages[i]}/>)
    }
    return links;
  }

  return (
          <div className="NavBar">
            <a href='/'><img className="Logo" src={props.logo} alt="Daniel Mauro"/></a>
            <div className="Pages">
              {renderPageLinks()}
            </div>
            <div className="Socials">
              <a className="SocialItem Spotify" href="https://open.spotify.com/artist/0eh6TL4x6u9lcanAdWrz5Z?si=UKAGcVIgSii79AubZi59og" target="_blank" rel="noopener noreferrer"><img src={spotify} alt="spotify"/></a>
              <a className="SocialItem Apple" href="https://music.apple.com/us/artist/daniel-mauro/1573319648" target="_blank" rel="noopener noreferrer"><img src={apple} alt="apple"/></a>
              <a className="SocialItem Instagram" href="https://www.instagram.com/danielmauromusic/?hl=en" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="instagram"/></a>
              <a className="SocialItem Youtube" href="https://www.youtube.com/channel/UCrf2dSH0iVPcD2PrKxpIQMQ" target="_blank" rel="noopener noreferrer"><img src={youtube} alt="youtube"/></a>
              <a className="SocialItem Amazon" href="https://music.amazon.com/artists/B07DKBMHV4/daniel-mauro?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_vWwuK24FxnodXMfUwoCptaDv0" target="_blank" rel="noopener noreferrer"><img src={amazon} alt="amazon"/></a>
              <a className="SocialItem Tiktok" href="https://m.tiktok.com/h5/share/usr/6976837457049797637.html?_d=secCgwIARCbDRjEFSACKAESPgo8RgO232wfrdmtARVetY8LvowQnnDnQtlqxY75iTUcA7HyH4rAAhIptf19dkqKIz%2FLJUeY5aR4d%2FLL%2B515GgA%3D&checksum=014503afcb6624ed6a69d30d75e51390a008c3771ed29f8aba768250d900bf7b&language=en&sec_uid=MS4wLjABAAAAuGxmZ_OtrOK1fP9Bf6iM4vAppG3Ka0voD_47SBg5YWTuQ3KnRzAo3vpYtzNopQ6K&sec_user_id=MS4wLjABAAAAuGxmZ_OtrOK1fP9Bf6iM4vAppG3Ka0voD_47SBg5YWTuQ3KnRzAo3vpYtzNopQ6K&share_app_id=1233&share_author_id=6976837457049797637&share_link_id=52AC1505-147A-4F3E-B5F7-2ABA4CFFEB76&tt_from=copy&u_code=dj88i7892k9baf&user_id=6976837457049797637&utm_campaign=client_share&utm_medium=ios&utm_source=copy" target="_blank" rel="noopener noreferrer"><img src={tiktok} alt="tiktok"/></a>
            </div>
          </div>
  );
}

export default NavBar;