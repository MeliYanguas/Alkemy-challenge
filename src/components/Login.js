/* eslint-disable */
import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

import Home from "./Home";

import { API_URL } from "../API_URL";

import "./Style.css";
import "./css/Login.css";

const Login = () => {
  const history = useHistory();

  const [isLogged, setIsLogged] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const logout = () => {
    console.log("logout");
    setIsLogged(false);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({ email: email, password: password });

    const requestBody = {
      email: email,
      password: password,
    };

    if (email == "" || password == "") {
      alert("complete los campos por favor");
    } else {
      axios
        .post(API_URL, requestBody)
        .then((res) => {
          console.log(res);
          if (res.data.token) {
            console.log("todo ok");
            console.log(res.data.token);
            localStorage.setItem("token", res.data.token);
          }
          setIsLogged(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          console.log("details do not match");
          setError("details do not match");
        });
    }
  };

  return (
    <div className="route">
      {isLogged ? (
        <div className="home">
          <nav className="navbar navbar-dark bg-primary">
            <button
              className="btn btn-outline-secondary mx-2 logout"
              onClick={logout}
            >
              Logout
            </button>
          </nav>
          <Home />
        </div>
      ) : (
        <div className="login">
          <form onSubmit={handleLogin}>
            <h2>Login</h2>

            <div className="email">
              <label htmlFor="email">Email : </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                id="email"
                placeholder="EMAIL"
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password : </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                id="password"
                placeholder="PASSWORD"
              />
            </div>
            <input
              className="btn btn-primary form-control my-2 my-sm-0"
              type="submit"
              value="Enviar"
            />
            {/* DISPLAY ERROR */}

            {error != "" ? (
              <div className="error text-warning mt-3">{error}</div>
            ) : (
              ""
            )}
          </form>
        </div>
      )}
    </div>
  );
};
export default Login;
