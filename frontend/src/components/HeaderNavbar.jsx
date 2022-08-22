import React from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/index.jsx';

const Navbar = () => {
  const { logOut, user } = useAuth();

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to="/">Home</BootstrapNavbar.Brand>
        {!!user && <Button onClick={logOut}>Выйти</Button>}
      </div>
    </BootstrapNavbar>
  );
};

export default Navbar;
