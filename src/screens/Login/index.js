import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { loginApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";

import LoadingOverlay from "../../components/LoadingOverlay";

export default function Login({ setToken }) {
  const { login, auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const dbs = [
    { label: "Lasa Motors", value: "DB_LM" },
    { label: "Avant Auto", value: "DB_AA" },
    { label: "Gar 210", value: "DB_GA" },
    { label: "Motoplex", value: "DB_MP" },
    { label: "KTM Import", value: "DB_KI" },
    { label: "Cycle Lab", value: "DB_CL" },
    { label: "DMS PRUEBA", value: "DB_AA_TEST" },
  ];

  const loginForm = useFormik({
    initialValues: { username: "", password: "", companyDB: "DB_LM" },
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string().required("Usuario es un campo obligatorio"),
      password: Yup.string().required("Contraseña es un campo obligatorio"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      let res = await loginApi(values);
      console.log(res);
      if (res.error == true) {
      } else {
        login(res.body);
        console.log(auth);
        setToken(res.body.SessionId);
      }
      setIsLoading(false);

      //

      // resetForm();
    },
  });

  return (
    <>
      <div className="login-form-container">
        <div className="login-form">
          <div className="form">
            <h4 className="text-center">Grupo Avant</h4>
            <div className="form-group">
              <label>Usuario</label>
              <input
                className="form-control"
                value={loginForm.values.username}
                onChange={(e) =>
                  loginForm.setFieldValue("username", e.target.value)
                }
                placeholder="username"
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                className="form-control"
                value={loginForm.values.password}
                onChange={(e) =>
                  loginForm.setFieldValue("password", e.target.value)
                }
                placeholder="password"
                type="password"
              />
            </div>
            <div className="form-group">
              <label>Empresa</label>
              <select
                className="form-control"
                value={loginForm.values.companyDB}
                onChange={(e) => {
                  loginForm.setFieldValue("companyDB", e.target.value);
                }}
              >
                {dbs.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="form-group mt-2"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <span
                className="btn text-white"
                style={{ backgroundColor: "#a73333" }}
                onClick={loginForm.handleSubmit}
              >
                Entrar
              </span>
            </div>
            <div className="form-group">
              {Object.entries(loginForm.errors).map((e, i) => (
                <p className="m-0 error" key={i}>
                  {e[1]}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      {<LoadingOverlay show={isLoading} onHide={() => setIsLoading(false)} />}
    </>
  );
}
