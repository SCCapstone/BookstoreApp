import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCart } from "react-icons/io";

import { ButtonGroup, Button, AddIcon, RemoveIcon } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";



const NavBar = ({ user }) => {
  const navigate = useNavigate();
  const [shoppingCartQuantity, setShoppingCartQuantity] = useState(0);


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItemsQuantity'));
    if (items) {
      setShoppingCartQuantity(items);
    }
    console.log(items);
  }, []);

  var loginOrLogout = () => {
    if (user && user.length !== 0) {
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("userID");
      window.location.reload();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <nav class="bg-persian_plum px-4 sm:px-6 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b-4 border-gray-200 dark:border-gray-600">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <span className="flex gap-8">
            <a href="/" class="flex items-center cols-span-8">
              <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">
                Book Store Website
              </span>
            </a>
          </span>
          <div class="flex md:order-2 grid grid-cols-5">
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
            <div />
            <button class="" onClick={loginOrLogout}>
              <span className="text-white text-xl">
                {user && user.length !== 0 ? "Logout" : "Login"}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
