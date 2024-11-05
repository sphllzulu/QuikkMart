import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, Link } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLogout = () => {
    navigate('/signin')
  }

  return (
    <AppBar position="static" sx={{ bgcolor: '#ff4081' }}>
      <Toolbar>
        <Box flexGrow={1}>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
              Beauty Mart
            </Typography>
          </Link>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;