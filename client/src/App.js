import React from 'react';
import Navbar from './components/Navbar/Navbar';
import LeftSideNavbar from './components/LeftSideNavbar/LeftSideNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './screens/Home'
import ContactUs from './screens/ContactUs'
import Community from './screens/Community'
import Browse from './screens/Browse'
import AboutUs from './screens/AboutUs'
import './App.css';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Router>
        <LeftSideNavbar />
        <Switch>
          <Route path='/' exact components={Home} />
          <Route path='/browse' components={Browse} />
          <Route path='/about-us' components={AboutUs} />
          <Route path='/contact-us' components={ContactUs} />
          <Route path='/community' components={Community} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
