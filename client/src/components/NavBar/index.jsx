import { React } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../views/Home";
import Login from "../../views/Login";
import Aboutus from "../../views/Aboutus";
import TOS from "../../views/TOS";
import ContactUs from "../../views/ContactUs";
import Browse from "../../views/Browse";
import Signup from "../../views/Signup";
import BooksPageGenerator from "../../views/BooksPageGenerator";
import books from "../../views/Books";
import ValidatedUsers from "../../views/ValidatedUsers";

const CompleteNavbar = () => {
  const user = localStorage.getItem("token");

  return (
    <div className="pt-16 bg-gainsboro">
      <div className="flex">
        <SideBar user={user}/>
        <div className="px-16"></div>
        <BrowserRouter>
          <NavBar user={user} />
          <Routes>
            {/* All users */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/terms_of_service" element={<TOS />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/create_account" element={<Signup />} />

            {/* Admin */}
            <Route path="/users" element={<ValidatedUsers currentUser={user} />} />

            {books.map((book) => (
              <Route
                path={`${book.link}`}
                element={<BooksPageGenerator book={book} />}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default CompleteNavbar;
