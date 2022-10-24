import logo from './logo.svg';
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
          <Route path='/'>
            <UploaderPage />
          </Route>
          <Route path='/success'>
            <PreviewPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
