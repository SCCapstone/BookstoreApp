import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Browse from './pages/Browse';
import About from './pages/About';
import ContactUs from './pages/ContactUs';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/browse' component={Browse} />
          <Route path='/about' component={About} />
          <Route path='/contactus' component={ContactUs} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
