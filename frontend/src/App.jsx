/* eslint-disable no-unused-vars */
import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';

import LoginPage from './Views/Login.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="h-100">
        <LoginPage/>
      </div>
    </Router>
  );
}

export default App;
