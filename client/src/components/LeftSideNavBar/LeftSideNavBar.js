import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LeftSideNavBarData } from './LeftSideNavBarData';
import { IconContext } from 'react-icons';
import './LeftSideNavBar.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import CreateAccount from '../../views/CreateAccount/FormSignUp';


function LeftSideNavBar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>

        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div class = "button">

            <button>Login</button>
            <form action="/createaccount" method="get">
    <input type="submit" value="create account" 
         name="Submit" id="frm1_submit" />
</form>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {LeftSideNavBarData.map((item, index) => {
              return (
                <li key={index} className={item.classname}>
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
