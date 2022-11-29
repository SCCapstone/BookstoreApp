import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LeftSideNavBarData } from "./LeftSideNavBarData";
import { IconContext } from "react-icons";
import "./LeftSideNavBar.css";
import "./NavBarBtns";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import NavBarBtns from "./NavBarBtns";

function LeftSideNavBar({ user }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  var isLoggedIn = () => {
    // console.log(user);
    // if (user.email === "") return false;
    // return true;
    return false;
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
            {LeftSideNavBarData.map((item, index) => {
              return (
                <li key={index} className={item.className}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default LeftSideNavBar;
