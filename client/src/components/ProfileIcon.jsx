import React, { Component, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
export default class ProfileIcon extends Component {

  // const [anchorEl, setAnchorEl] = useState(true);
  // const open = Boolean(anchorEl);
  
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  constructor(props) {
    super(props);
    this.state = {
        user: {},
        anchorEl: true,
        open: true,
        setAchorEl: null
    };
  };

  async componentDidMount() {
      const url = "/api/users/" + this.props.currentUser;

      await axios.get(url).then(res => {
          let user = res.data;
          user.password = "";

          this.setState((state) => ({
              user: user 
          }));
      });
  }

  render() {
      return (
        <div class="py-4">
          <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={() =>  { 
                    this.setState((state) => ({
                    anchorEl: !this.state.anchorEl
                  }));
                  }}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={this.state.open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={this.state.open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 33, height: 33 }}>{this.state.user.firstName}</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={this.state.anchorEl}
              id="account-menu"
              open={this.state.open}
              onClose={this.state.setAchorEl}
              onClick={this.state.setAchorEl}
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
              transformOrigin={{ horizontal: 'right-center', vertical: 'top-center' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top-center' }}
            >
              <MenuItem onClick={this.state.setAchorEl}>
                <li>
                  <a
                    href="/my_account"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Manage Account
                  </a>
                </li>
              </MenuItem>
              <Divider />
              <MenuItem onClick={this.state.setAchorEl}>
              <li>
                  <a
                    href="/"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
              </MenuItem>
              <MenuItem onClick={this.state.setAchorEl}>
                <li>
                  <a
                    href="/cart"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Cart & Earnings
                  </a>
                </li>
              </MenuItem>
              <MenuItem onClick={this.state.setAchorEl}>
                <li>
                  <a
                    href="/favorites"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Wishlist
                  </a>
                </li>
              </MenuItem>
            </Menu>
          </React.Fragment>
        </div>
      )
    }
}