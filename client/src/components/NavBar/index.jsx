import { React, useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import SideBar from "./SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../views/Home";
import Login from "../../views/Login";
import Aboutus from "../../views/Aboutus";
import TOS from "../../views/TOS";
import ContactUs from "../../views/ContactUs";
import Reviews from "../../views/ReviewsPageGenerator";
import Browse from "../../views/Browse";
import Signup from "../../views/Signup";
import BooksPageGenerator from "../../views/BooksPageGenerator";
// import books from "../../views/Books";
import ValidatedUsers from "../../views/ValidatedUsers";
import CreateForum from "../../views/CreateForum";
import MainCart from "../../views/Cart";
import AddBook from "../../views/AddBook";
import EmployeeHomepage from "../../views/EmployeeHomePage";
import MyAccount from "../../views/MyAccount";
import Favorites from "../../views/Favorites";
import Orders from "../../views/Orders";
import EditBlogpage from "../../views/EditBlogPage";
import VerifyEmail from "../../views/VerifyEmail";
import ChangePassword from "../../views/ChangePassword";

const CompleteNavbar = () => {
  const user = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const role = localStorage.getItem("role");
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

  // function clear_cart() {
  //   localStorage.setItem("books_cart", JSON.stringify([]));
  //   localStorage.setItem("booksCartNames", JSON.stringify({}));

  //   window.location.reload(false);
  // }
  // console.log(localStorage.getItem("books_cart"));
  // console.log(localStorage.getItem("booksCartNames"));

  // if (
  //   !localStorage.getItem("books_cart") ||
  //   !localStorage.getItem("booksCartNames")
  // ) {
  //   clear_cart();
  //   console.log("Cart Initialized");
  // }
  // const saveBooksToLocalStorage = () => {
  //   if (books.length !== 0) {
  //     //this line is new
  //     localStorage.setItem("booksFromTheDatabase", JSON.stringify(books));
  //   }
  // };
  // saveBooksToLocalStorage();
  // console.log(books);

  // const items = JSON.parse(localStorage.getItem('cartItemsQuantity'));

  return (
    <div className="pt-16 bg-gainsboro">
      <div className="flex">
        <SideBar user={user} />
        <div className="px-16"></div>
        <BrowserRouter>
          <NavBar user={localStorage.getItem("userID")} userType={userType} items={items} />
          <Routes>
            {/* All users */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/terms_of_service" element={<TOS />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/create_account" element={<Signup />} />
            <Route
              path="/cart"
              element={
                <MainCart currentUser={localStorage.getItem("userID")} />
              }
            />

            {/* Admin and Customer */}
            <Route
              path="/my_account"
              element={
                <MyAccount currentUser={localStorage.getItem("userID")} />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites currentUser={localStorage.getItem("userID")} />
              }
            />

            {/* Admin */}
            <Route path="/add_book" element={<AddBook currentUser={user} />} />
            <Route
              path="/users"
              element={<ValidatedUsers currentUser={userType} />}
            />
            <Route
              path="/emp_page"
              element={<EmployeeHomepage currentUser={userType} />}
            />
            <Route path="/orders" element={<Orders currentUser={userType} />} />

            <Route
              path="/edit_blog"
              element={<EditBlogpage currentUser={userType} />}
            />

            {/* Admin, Employee, and Customer */}
            <Route
              path="/createforums"
              element={<CreateForum user={localStorage.getItem("userID")} />}
            />

            {/* Mapped Routes */}
            {books.map((book) => (
              <Route
                path={`/${book.author}/${book.title}/`}
                element={<BooksPageGenerator book={book} user={localStorage.getItem("userID")} />}
              />
            ))}
            {/* Mapped Route for Reviews */}
            {books.map((book) => (
              <Route
                path={`/${book.author}/${book.title}/reviews`}
                element={<Reviews book={book} />}
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
