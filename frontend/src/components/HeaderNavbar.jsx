import React from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/index.jsx';

const Navbar = () => {
  const { logOut, loggedIn } = useAuth();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to="/">Home</BootstrapNavbar.Brand>
        { user || loggedIn ? <Button onClick={logOut}>Выйти</Button> : null }
      </div>
    </BootstrapNavbar>
  );
};

export default Navbar;
