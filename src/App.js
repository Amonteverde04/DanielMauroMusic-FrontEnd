import {Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ComingSoonPage from './Pages/ComingSoonPage';
import ShowsPage from './Pages/ShowsPage';
import MediaPage from './Pages/MediaPage';
import AdminPage from './Pages/admin';

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <HomePage/>
      </Route>
      <Route path="/Merch">
        <ComingSoonPage/>
      </Route>
      <Route path="/Shows">
        <ShowsPage/>
      </Route>
      <Route path="/Media">
        <MediaPage/>
      </Route>
      <Route path="/api">
      </Route>
      <Route path="/adminportal">
        <AdminPage/>
      </Route>
    </div>
  );
}

export default App;
