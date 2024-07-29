import './NavBar.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Music Depot
        </Typography>
        {currentPath !== '/' && (
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        )}
        {currentPath !== '/search' && (
          <Button color="inherit" component={Link} to="/search">
            Search
          </Button>
        )}
        {currentPath !== '/favorites' && (
          <Button color="inherit" component={Link} to="/favorites">
            Favorites
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;