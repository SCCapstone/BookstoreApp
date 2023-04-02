import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "react-use-cart";
import Main_Cart from "./views/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));

//used to parse through each item in the JSON file and stores it in local storage for the books in the cart
const tmp = JSON.parse(localStorage.getItem('cartItems'));

//used to render to different pages
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

 // If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
