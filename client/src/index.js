import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';

function HiThere() {
    const element = <h1 style={{textAlign: "center"}} >The Bookstore App</h1>;
    return element;
  }


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
      <HiThere></HiThere>
    </>
);
