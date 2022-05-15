import React, { Fragment, useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Employee from "./components/Employee";
import Detail from "./components/Detail";

function App() {
  const [isAunthenticated, setIsAunthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAunthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:3001/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      // console.log(parseRes);
      parseRes === true
        ? setIsAunthenticated(true)
        : setIsAunthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <Fragment>
      <BrowserRouter>
        <div className="container"></div>
        <Routes>
          <Route
            exact
            path="/"
            element={
              !isAunthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAunthenticated ? (
                <Register setAuth={setAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAunthenticated ? (
                <Dashboard setAuth={setAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/employee"
            element={
              // isAunthenticated ? (
              <Employee setAuth={setAuth} />
              // ) : (
              //   <Navigate to="/" />
              // )
            }
          />
          <Route
            path="/detail/:id"
            element={
              isAunthenticated ? (
                <Detail setAuth={setAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
