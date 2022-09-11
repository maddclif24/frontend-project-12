import React from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';

const Navbar = () => {
  const { logOut, loggedIn } = useAuth();
  const user = JSON.parse(localStorage.getItem('user'));
  const { t } = useTranslation();
  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to="/">Home</BootstrapNavbar.Brand>
        { user || loggedIn ? <Button onClick={logOut}>{t('chatPage.log_out')}</Button> : null }
      </div>
    </BootstrapNavbar>
  );
};

export default Navbar;
