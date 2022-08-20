/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable padded-blocks */

import React from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import cn from "classnames";

const LoginPage = () => {
  const loginSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Не менее 3 символов")
      .max(15, "Не более 15 символов"),
    password: Yup.string()
      .min(8, "Пароль должен быть не менее 8 символов")
      .max(25, "Слишком длинный пароль >= 25"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
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
                  <Form
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                    onSubmit={formik.handleSubmit}
                  >
                    <h1 className="text-center mb-4">Войти</h1>
                    <Form.Group
                      className="form-floating mb-3"
                      controlId="formBasicEmail"
                    >
                      <FloatingLabel
                        controlId="name"
                        label="Ваш ник"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Ваш ник"
                          required
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          className={cn(
                            "form-control",
                            formik.errors.name ? "is-invalid" : "valid",
                          )}
                        />
                        {formik.errors.name ? (
                          <div className="invalid-tooltip">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group
                      className="form-floating mb-3"
                      controlId="formBasicPassword"
                    >
                      <FloatingLabel
                        controlId="password"
                        label="Ваш пароль"
                        className="mb-3"
                        type="password"
                      >
                        <Form.Control
                          type="password"
                          required
                          placeholder="Ваш пароль"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          className={cn(
                            "form-control",
                            formik.errors.password ? "is-invalid" : "valid",
                          )}
                        />
                        {formik.errors.password ? (
                          <div className="invalid-tooltip">
                            {formik.errors.password}
                          </div>
                        ) : null}
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
};
export default LoginPage;
