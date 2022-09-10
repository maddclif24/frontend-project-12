/* eslint-disable no-extra-boolean-cast */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable padded-blocks */

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useFormik } from "formik";
import { useTranslation } from 'react-i18next';
import * as Yup from "yup";
import cn from "classnames";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../routes";
import useAuth from "../hooks/index.jsx";
import { loginUser, selectors } from "../slices/loginSlice.js";

const LoginPage = () => {
  const [successAuth, setSuccessAuth] = useState(" ");
  const auth = useAuth();
  const navigation = useNavigate();
  const store = useSelector((state) => state.userCurrent);
  const dispatch = useDispatch();
  const { t } = useTranslation('loginPage', { returnObjects: true });

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Не менее 3 символов")
      .max(15, "Не более 15 символов"),
    password: Yup.string()
      .min(3, "Пароль должен быть не менее 3 символов")
      .max(25, "Слишком длинный пароль >= 25"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  const ref = useRef(null);

  const errorAuth = (
    <Form.Text className="text-danger">
      the username or password is incorrect
    </Form.Text>
  );

  if (store.login) {
    auth.logIn();
    navigation('/', { replace: true });
  }

  useEffect(() => {
    ref.current.focus();
  }, []);

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
                    onSubmit={formik.handleSubmit}
                  >
                    <h1 className="text-center mb-4">{t('title')}</h1>
                    <Form.Group
                      className="form-floating mb-3"
                      controlId="formBasicEmail"
                    >
                      <FloatingLabel
                        controlId="username"
                        label="Ваш ник"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t('username')}
                          required
                          name="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          className={cn(
                            "form-control",
                            store.error?.statusCode ? "is-invalid" : "valid",
                          )}
                          ref={ref}
                        />
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
                          placeholder={t('password')}
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          className={cn(
                            "form-control",
                            store.error?.statusCode ? "is-invalid" : "valid",
                          )}
                        />
                        {store.error?.statusCode ? (
                          <div className="invalid-tooltip">
                            Неверное имя пользователя или пароль
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
                    <span>{t('footer.text')}</span>
                    <a href="/signup">{t('footer.link')}</a>
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
