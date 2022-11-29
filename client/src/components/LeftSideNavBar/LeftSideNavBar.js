import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LeftSideNavBarData } from "./LeftSideNavBarData";
import { IconContext } from "react-icons";
import "./LeftSideNavBar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

function LeftSideNavBar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

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
          <div className="button">
            <a href="/createaccount" class="button-solid signup">
              Sign up
            </a>

            <a href="/login" class="button-solid login">
              Login
            </a>
          </div>
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
