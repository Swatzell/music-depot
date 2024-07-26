import './NavBar.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav>
      <ul>
        {currentPath !== '/' && (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}
        {currentPath !== '/search' && (
          <li>
            <Link to="/search">Search</Link>
          </li>
        )}
        {currentPath !== '/favorites' && (
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;