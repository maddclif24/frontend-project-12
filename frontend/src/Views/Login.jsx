/* eslint quotes: ["error", "backtick"] */

import React from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";

const LoginPage = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            Hexlet Chat
          </a>
        </div>
      </nav>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center"></div>
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group
                    className="form-floating mb-3"
                    controlId="formBasicEmail"
                  >
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Ваш ник"
                      className="mb-3"
                    >
                      <Form.Control type="email" placeholder="Ваш ник" />
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group
                    className="form-floating mb-3"
                    controlId="formBasicPassword"
                  >
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Ваш пароль"
                      className="mb-3"
                    >
                      <Form.Control type="password" placeholder="Ваш пароль" />
                    </FloatingLabel>
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="w-100 mb-3 btn"
                    type="submit"
                  >
                    Войти
                  </Button>
                </Form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>
                  <a href="#">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LoginPage;
