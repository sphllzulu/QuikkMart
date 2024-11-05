import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, Link } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLogout=()=>{
    navigate('/signin')
  }

  return (
    <AppBar position="static" sx={{ bgcolor: '#ff4081' }}>
      <Toolbar>
        {/* App Name */}
        <Link to={'/'}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#ffffff' }}>
          Beauty Mart
        </Typography>
        </Link>
        {/* Cart Icon */}
        <IconButton
          color="inherit"
          onClick={handleCartClick}
          sx={{
            color: '#ffffff',
            '&:hover': { color: '#ff6e40' },
          }}
        >
          <ShoppingCartIcon />
        </IconButton>

        {/* Logout Icon */}
        <IconButton
          color="inherit"
          onClick={handleLogout}
          sx={{
            color: '#ffffff',
            '&:hover': { color: '#ff6e40' },
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
