import './ComingSoonPage.css';
import CopyRight from '../Components/CopyRight';
import NavBar from '../Components/NavBar';

function MerchPage() {
    return (
        <header className="App-header-Merch">
          <NavBar logo = {"https://i.imgur.com/CywUw4S.png"}></NavBar>
          <h1 >Coming soon...</h1>
          <a href='/'>Click me to go back!</a>
          <CopyRight></CopyRight>
      </header>
    );
}

export default MerchPage;