import "./App.css";
import CompleteNavbar from "./components/NavBar"; //has the side nav bar and the corresponding views pages which appear which are in index.jsx and SideBar.jsx and the top nav bar which is also utilized to make the complete navbar
import { BrowserRouter, Routes } from "react-router-dom"; //used to route to different pages
import { CartProvider } from "react-use-cart"; //for the cart to check the books
import Main_Cart from "./views/Cart/Cart";
import { useState, useEffect } from "react"; //use state feature

//functions as the "main" of the App where the side nav bar with the view components and the top nav bar will appear on every page when on a different view
//it is functioned through using routes
function App() {
  return (
    <div className="bg-gainsboro h-screen"> {/*the home screen's set hard-coded default color based on our design from Figma*/}
      <CompleteNavbar />
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
