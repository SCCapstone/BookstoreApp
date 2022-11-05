import React, {Component } from 'react';
import { MenuList } from "./MenuList";

class Navbar extends Component {
    render() {
        return (
            <nav className='NavbarList'>
                <h1 className='navbar-logo'>React<i className='fab fa-react'></i></h1>
                <div className='menu-icon'>

                </div>
                <ul>
                    {MenuList.map((element, index) => {
                        return (
                            <li key={index}>
                                <a className={element.cName} href={element.url}>
                                {element.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default Navbar