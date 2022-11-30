import React, { useState } from "react";
import { Link } from "react-router-dom";
import LeftSideNavBar from "./LeftSideNavBar";
import { IconContext } from "react-icons";
import "./NavBar.css";
import "./NavBarBtns";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import NavBarBtns from "./NavBarBtns";

function NavBar({ user }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  var isLoggedIn = () => {
    return user && user.length !== 0;
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="title">
            <a href="/" class="button-solid">
              Bookstore Website
            </a>
          </div>
          <NavBarBtns isLoggedIn={isLoggedIn()} />
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <LeftSideNavBar isLoggedIn={isLoggedIn()} />
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavBar;
