import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileIconDropdown from "../ProfileIconDropdown";

const NavBar = ({ user }) => {
  const navigate = useNavigate();

  var loginOrLogout = () => {
    if (user && user.length !== 0) {
      localStorage.removeItem("token");
      window.location.reload();
    } else {
      navigate("/login");
    }
  };



  return (
    <div>
      <nav class="absolute bg-persian_plum px-4 sm:px-6 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b-4 border-gray-200 dark:border-gray-600">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <span className="flex gap-8">
            <a href="/" class="flex items-center cols-span-8">
              <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">
                Book Store Website
              </span>
            </a>
          </span>
          <div class="flex md:order-2 columns-2 gap-4">
            <button class="flex items-center" onClick={loginOrLogout}>
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
