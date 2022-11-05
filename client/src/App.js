import React from 'react';
import Navbar from './components/Navbar/Navbar';
import LeftSideNavbar from './components/LeftSideNavbar/LeftSideNavbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Router>
        <LeftSideNavbar />
        <Switch>
          <Route path='/' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
