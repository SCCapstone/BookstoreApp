import { React, useState, useEffect, Link } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCart } from "react-icons/io";

import navbar_logo from "../NavBar/navbar_logo.jpg"

import { ButtonGroup, Button, AddIcon, RemoveIcon } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import ProfileIcon from "../ProfileIcon";

let val = 0;

function cartChange() {
  var booksCartNames = JSON.parse(localStorage.getItem("booksCartNames"));
  val = findQuantity(booksCartNames);
}

function findQuantity(booksCartNames) {
  let count = 0;
  for (var key in booksCartNames) count = count + booksCartNames[key];
  return count;
}

function clearCart() {
  localStorage.removeItem("booksCartNames"); 
}

const NavBar = ({ user, items, isLoggedIn }) => { // add isLoggedIn prop to indicate if the user is logged in
  const navigate = useNavigate();
  const [shoppingCartQuantity, setShoppingCartQuantity] = useState(0);

  useEffect(() => {
    if (val && isLoggedIn) { // update useEffect to check if val has a value and the user is logged in
      setShoppingCartQuantity(val);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      clearCart(); // clear cart when user logs out
      setShoppingCartQuantity(0);
    }
  }, [isLoggedIn]);

  return (
    <div>
      <nav class="bg-persian_plum px-4 sm:px-6 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b-4 border-gray-200 dark:border-gray-600">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <span className="flex gap-8">
            <a href="/" class="flex items-center cols-span-8">
              <img
              src={navbar_logo}
              alt="BookStore Logo"
              className="row-span-3"
            />
            </a>
          </span>
          <div class="flex md:order-2 grid grid-cols-5">
            {isLoggedIn && ( // render cart icon only if user is logged in
              <Badge
                badgeContent={val}
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

export { NavBar, cartChange };
