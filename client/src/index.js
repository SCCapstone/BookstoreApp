import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "react-use-cart";
import Main_Cart from "./views/Cart/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));

const tmp = JSON.parse(localStorage.getItem('cartItems'));

// if(tmp == null){localStorage.setItem('cartItems', JSON.stringify(0));}

// tmp = JSON.parse(localStorage.getItem('books_cart'));
// // if(tmp == null){localStorage.setItem("books_cart", JSON.stringify([]));}

// tmp = JSON.parse(localStorage.getItem('booksCartNames'));
// if(tmp == null){localStorage.setItem("booksCartNames", JSON.stringify([]));}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
