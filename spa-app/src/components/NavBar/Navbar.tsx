import React from 'react';
import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/logo.svg';
import styles from './navbar.module.css';
import theme from '../../theme/theme.tsx';

const Navbar = ({
  category,
  username,
  userPhoto,
}: {
  category: string;
  username: string;
  userPhoto: string;
}) => {
  const isSMOrSmaller = useMediaQuery (theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openSidebar = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleSidebarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSidebarClose = () => {
    setAnchorEl(null);
  };

  let menuItems: string[][] = [];

  if (category === 'user') {
    menuItems = [
      ['Audio Books', '/AudioBooks'],
      ['Saved Books', '/SavedBooks'],
    ];
  } else if (category === 'admin') {
    menuItems = [
      ['Edit Transcript', '/admin/EditTranscript'],
      ['Membership Requests', '/admin/MembershipRequests'],
    ];
  }

  return (
    <AppBar
      position="fixed"
      color="secondary"
      elevation={0}
      sx={{
        boxShadow: '2px 5px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <div className={styles.menu}>
          {isSMOrSmaller ? (
            <>
            <img src={logo} className={styles.logo} alt="Logo" />
            <IconButton aria-label="menu" onClick={handleSidebarClick}>
                <MenuIcon />
            </IconButton>
              <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openSidebar}
                  onClose={handleSidebarClose}
                  MenuListProps={{
                      'aria-labelledby': 'basic-button',
                  }}
              >
                {menuItems.map((menuItem, index) => (
                    <MenuItem key={index} onClick={() => navigate(menuItem[1])}>{menuItem[0]}</MenuItem>
                ))}
            </Menu>
            </>
          ) : (
            <>
              <img src={logo} className={styles.logo} alt="Logo" />
              {menuItems.map((menuItem) => (
                <Link to={menuItem[1]} key={menuItem[0]}>
                  {menuItem[0]}
                </Link>
              ))}
            </>
          )}
        </div>
        <div className={styles.userInfo}>
          {userPhoto ? (
            <Avatar sx={{ width: 25, height: 25 }}>
              <img src={userPhoto} alt="User" />
            </Avatar>
          ) : (
            <Avatar sx={{ width: 25, height: 25 }}>
              {username.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <Link
            to={category === 'user' ? '/Profile' : '/admin/Profile'}
            className={styles.userName}
          >
            {username}
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
