import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  auth: () => {},
  login: () => {},
  logout: () => {},
});

export function AuthProvider(props) {
  const { children } = props;
  //const [auth, setAuth] = useState();

  const login = (userData) => {
    console.log("hi");
    sessionStorage.setItem("session", JSON.stringify(userData));
  };

  const logout = () => {
    sessionStorage.removeItem("session");
  };

  const auth = (() => {
    return JSON.parse(sessionStorage.getItem("session"));
  })();

  const valueContext = {
    auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
