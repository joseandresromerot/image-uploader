import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import UploaderPage from './pages/UploaderPage';
import PreviewPage from './pages/PreviewPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <UploaderPage />
          </Route>
          <Route path='/success'>
            <PreviewPage />
          </Route>
        </Switch>
      </Router>

      <div className='footer'>created by joseandresromerot - devChallenges.io</div>
    </div>
  );
}

export default App;
