import React, { Component, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
export default function ProfileIcon(currentUser) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({});
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.currentUser === null) return;
      const url = "/api/users/" + currentUser.currentUser;
      let res = await axios.get(url);
      res.data.password = "";
      setUser(res.data);
    };
    fetchData();
  },[]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userID");
    localStorage.removeItem("book_cart");
    localStorage.removeItem("booksCartNames");
    window.location.reload();
    window.location.href = "/";
    console.log("logout");
  };
  
  const isLoggedIn = () => {
    return currentUser?.currentUser?.length !== 0 && currentUser.currentUser !== null;
  };

  const userInitials = () => {
    let initials = "";
    if (user?.firstName?.length > 0) {
      initials += user.firstName[0];
      if (user?.lastName.length>0) {
        initials += user.lastName[0];
      }
    } else {
      initials = "##";
    }
    return initials.toUpperCase();
  }

  return isLoggedIn() ? (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 40, height: 40 }}>{userInitials()}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <li>
            <a
              href="/my_account"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black"
            >
              Manage Account
            </a>
          </li>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <li>
            <a
              href="/cart"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black"
            >
              Cart & Earnings
            </a>
          </li>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <li>
            <a
              href="/favorites"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black"
            >
              Wishlist
            </a>
          </li>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <li>
          <a
              href="/"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black"
            >
              Logout
            </a>
          </li>
        </MenuItem>
      </Menu>
    </React.Fragment>
    ): (
    <div>
      <button class="">
        <a className="text-white text-xl" href="/login">
          Login
        </a> 
      </button>
    </div>
  );
};