import { React, useState, useEffect } from "react";
import { NavBar } from "./NavBar";
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
// import books from "../../views/Books";
import ValidatedUsers from "../../views/ValidatedUsers";
import MainCart from "../../views/Cart";
import AddBook from "../../views/AddBook";
import EmployeeHomepage from "../../views/EmployeeHomePage";
import MyAccount from "../../views/MyAccount";
import Favorites from "../../views/Favorites";
import Orders from "../../views/Orders";
import EditBlogpage from "../../views/EditBlogPage";
import VerifyEmail from "../../views/VerifyEmail";
import ChangePassword from "../../views/ChangePassword";
import UpdateBooks from "../../views/UpdateBooks";


const CompleteNavbar = () => {
  const user = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userID");
  const items = JSON.parse(localStorage.getItem("cartItemsQuantity"));
  // console.log(items);

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const fetchBooks = () => {
    return fetch("/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  };

  const fetchUsers = () => {
    return fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }

  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  return (
    <div className="pt-16 bg-gainsboro">
      <div className="flex">
        <SideBar user={user} />
        <div className="px-16"></div>
        <BrowserRouter>
          <NavBar user={userId} userType={userType} items={items} />
          <Routes>
            {/* All users */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login currentUser={userId} />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/terms_of_service" element={<TOS />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/browse" element={<Browse />} />
            <Route path='/create_account' element={<Signup />} />
            <Route
              path="/cart"
              element={
                <MainCart currentUser={userId} />
              }
            />

            {/* Admin and Customer */}
            <Route
              path="/my_account"
              element={
                <MyAccount currentUser={userId} />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites currentUser={userId} />
              }
            />

            {/* Admin */}
            <Route path="/add_book" element={<AddBook role={userType} />} />
            <Route
              path="/users"
              element={<ValidatedUsers userRole={userType} />}
            />
            <Route
              path="/update_books"
              element={<UpdateBooks userRole={userType} />}
            />
            <Route
              path="/emp_page"
              element={<EmployeeHomepage userRole={userType} />}
            />
            <Route path="/orders" element={<Orders userRole={userType} />} />

            <Route
              path="/edit_blog"
              element={<EditBlogpage userRole={userType} />}
            />

            {/* Mapped Routes */}
            {books.map((book) => (
              <Route
                path={`/${book.author}/${book.title}/`}
                element={<BooksPageGenerator book={book} user={userId} />}
              />
            ))}

            {/* Mapped Route for Validating Emails */}
            {users.map((user) => (
              <Route path = {`/validate/${user.verifyEmailToken}`}
              element={<VerifyEmail user={user}/>} />
            ))}

            {/* Mapped Route for Changing Passwords */}
            {users.map((user) => (
              <Route path = {`/forgot/${user.updatePasswordToken}`}
              element={<ChangePassword user={user}/>} />
            ))}
            
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

// books.map is the key -- here's where you map the /reviews to the book.

export default CompleteNavbar;
