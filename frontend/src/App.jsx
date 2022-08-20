/* eslint-disable object-curly-newline */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React from "react";

import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";

import LoginPage from "./Views/Login.jsx";
import NotFoundPage from "./Views/Not_FoundPage.jsx";
import "./App.css";
import routes from './routes.js';

function App() {
  return (
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path={routes.loginPagePath()} element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
}

export default App;
