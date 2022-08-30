/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";

import { Provider } from "react-redux";
import LoginPage from "./Login.jsx";
import NotFoundPage from "./Not_FoundPage.jsx";
import Navbar from "./HeaderNavbar.jsx";
import "../App.css";
import routes from "../routes.js";
import AuthContext from "../contexts/index.jsx";
import useAuth from "../hooks/index.jsx";
import Chat from "./Chat/Chat.jsx";
import store from "../slices/index.js";

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? children : <Navigate to="/login" state={{ from: location }} />;
};

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navbar />
        <Routes>
          { /* <Route path="/" element={<Chat />} /> */ }
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Provider>
  );
}

export default App;
