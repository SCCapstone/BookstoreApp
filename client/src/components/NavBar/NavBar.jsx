import { React, useState, useEffect, Link } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCart } from "react-icons/io";

import navbar_logo from "../NavBar/navbar_logo.jpg"

import { Badge } from "@mui/material";
import ProfileIcon from "../ProfileIcon";

function findQuantity(booksCartNames) {
  let count = 0;
  for (var key in booksCartNames) count = count + booksCartNames[key];
  return count;
}

function clearCart() {
  localStorage.removeItem("booksCartNames");
}

const NavBar = ({ user, items, isLoggedIn }) => {
  const navigate = useNavigate();
  const [shoppingCartQuantity, setShoppingCartQuantity] = useState(0);

  useEffect(() => {
    const booksCartNames = JSON.parse(localStorage.getItem("booksCartNames"));
    const count = findQuantity(booksCartNames);
    setShoppingCartQuantity(count);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      clearCart(); // clear cart when user logs out
      setShoppingCartQuantity(0);
    }
  }, [isLoggedIn]);

  function handleCartChange() {
    const booksCartNames = JSON.parse(localStorage.getItem("booksCartNames"));
    const count = findQuantity(booksCartNames);
    setShoppingCartQuantity(count);
  }

  return (
    <div>
      <nav className="bg-persian_plum px-4 sm:px-6 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b-4 border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <span className="flex gap-8">
            <a href="/" className="flex items-center cols-span-8">
              <img
                src={navbar_logo}
                alt="BookStore Logo"
                className="row-span-3"
              />
            </a>
          </span>
          <div className="flex md:order-2 grid grid-cols-5">
            {isLoggedIn && (
              <Badge
                badgeContent={shoppingCartQuantity}
                color="primary"
                className=""
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <IoMdCart
                  onClick={() => navigate("/cart")}
                  className=""
                  style={{
                    position: "",
                    top: "10px",
                    right: "70px",
                  }}
                  size="40px"
                  color="white"
                />
              </Badge>
            )}
            <div />
            <ProfileIcon currentUser={user} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export { NavBar, handleCartChange };
