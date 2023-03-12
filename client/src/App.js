import "./App.css";
import CompleteNavbar from "./components/NavBar";
import { BrowserRouter, Routes } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import Main_Cart from "./views/Cart/Cart";
import { useState, useEffect } from "react";

function App() {
  return (
    <div className="bg-gainsboro h-screen">
      <CompleteNavbar />
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
