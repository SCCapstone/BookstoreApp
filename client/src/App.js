import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import ContactForm from "./views/ContactUs";
import AboutUs from "./views/AboutUs";
import Browse from "./views/Browse";
import SignUp from "./views/CreateAccount/SignUp";
import NavBars from "./components/NavBars/NavBar";
import TermsServices from "./views/TermsServices";
import LoginForm from "./views/Login/loginform";
import AdminPage from "./views/AdminPage/AdminPage";
import BookData from './components/Books.json'
//import "./App.css";

var React = require("react");
var Component = React.Component;

class App extends Component {
  render() {
    //const { data } = this.state;
    const user = localStorage.getItem("token");
    return (
      <div className="App">
        <BrowserRouter>
          <NavBars user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse placeholder="Search for a Book..." data={BookData} />} />
            <Route path="/contactus" element={<ContactForm />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/termsservices" element={<TermsServices />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/users" element={<AdminPage currentUser={user} />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
