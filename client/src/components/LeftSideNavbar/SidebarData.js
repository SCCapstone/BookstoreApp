import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Browse',
        path: '/browse',
        icon: <IoIcons.IoIosBrowsers />,
        cName: 'nav-text'
    },
    {
        title: 'About Us',
        path: '/about-us',
        icon: <IoIcons.IoIosPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Contact Us',
        path: '/contact-us',
        icon: <IoIcons.IoIosGlobe />,
        cName: 'nav-text'
    },
    {
        title: 'Community',
        path: '/community',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
]