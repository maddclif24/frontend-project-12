/* eslint-disable no-extra-boolean-cast */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable padded-blocks */

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import cn from "classnames";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../routes";
import useAuth from "../hooks/index.jsx";
import { loginUser, signupUser, selectors } from "../slices/loginSlice.js";

const SingUpPage = () => {
  const ref = useRef(null);

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const auth = useAuth();

  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Не менее 3 символов")
      .max(20, "До 20 символов"),
    password: Yup.string()
      .min(6, "Не менее 6 символов")
      .max(25, "До 25 символов"),
    confirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Пароли не совпадают",
    ),
  });

  const store = useSelector((state) => state.userCurrent);
  const f = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirm: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log(values);
      const { username, password } = values;
      dispatch(signupUser({ username, password }));
    },
  });

  if (store.login) {
    auth.logIn();
    navigation('/', { replace: true });
  }

  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center"></div>
                  <Form
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                    onSubmit={f.handleSubmit}
                  >
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <Form.Group
                      className="form-floating mb-3"
                      controlId="formBasicEmail"
                    >
                      <FloatingLabel
                        controlId="username"
                        label="Имя пользователя"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Имя пользователя"
                          required
                          onChange={f.handleChange}
                          name="username"
                          className={cn(
                            "form-control",
                            f.errors.username || store.error?.statusCode ? "is-invalid" : "valid",
                          )}
                        />
                        {f.errors.username ? (
                          <div className="invalid-tooltip">
                            {f.errors.username}
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
                        label="Пароль"
                        className="mb-3"
                        type="password"
                      >
                        <Form.Control
                          type="password"
                          required
                          placeholder="Пароль"
                          name="password"
                          onChange={f.handleChange}
                          className={cn(
                            "form-control",
                            f.errors.password || store.error?.statusCode ? "is-invalid" : "valid",
                          )}
                        />
                        {f.errors.password ? (
                          <div className="invalid-tooltip">
                            {f.errors.password}
                          </div>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      className="form-floating mb-3"
                      controlId="formBasicEmail"
                    >
                      <FloatingLabel
                        controlId="confirm"
                        label="Подтвердите пароль"
                        className="mb-3"
                      >
                        <Form.Control
                          type="confirm"
                          placeholder="Подтвердите пароль"
                          required
                          name="confirm"
                          onChange={f.handleChange}
                          className={cn(
                            "form-control",
                            f.errors.confirm || store.error?.statusCode ? "is-invalid" : "valid",
                          )}
                        />
                        {f.errors.confirm ? (
                          <div className="invalid-tooltip">
                            {f.errors.confirm}
                          </div>
                        ) : null}
                        {store.error?.statusCode ? (
                          <div className="invalid-tooltip">
                            Такой пользователь уже существует
                          </div>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>
                    <Button
                      variant="primary"
                      className="w-100 mb-3 btn"
                      type="submit"
                    >
                      Зарегистрироваться
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingUpPage;
