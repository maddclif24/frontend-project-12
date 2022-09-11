/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React from "react";
import ReactDOM from "react-dom/client";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import resources from "./locales/index.js";
import App from "./components/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "ru",
    debug: true,
  });

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
  );
};
export default init;