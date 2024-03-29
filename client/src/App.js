import "./App.css";
import CompleteNavbar from "./components/NavBar";
import { BrowserRouter, Routes } from "react-router-dom";

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
