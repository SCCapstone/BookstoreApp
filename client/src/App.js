import "./App.css";
import CompleteNavbar from "./components/NavBar";
import { BrowserRouter, Routes } from "react-router-dom";

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
