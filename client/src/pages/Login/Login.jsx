import React, { useState } from "react";
import "./login.scss";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import { api, header } from "../../api/api";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    const userCredentials = Object.fromEntries(formData);
    console.log(formData);
    setError("");
    axios
      .post(api.login, userCredentials, header)
      .then((response) => {
        console.log(response.data.data);
        console.log(response.data.token);
        let token = response.data.token;
        localStorage.setItem("auth-token", token);
        localStorage.setItem("user", response.data.data);

        window.alert(response.data.message);

        setError("");
        // loginScuccess(response.data.data);
        navigate("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
        // window.alert(error.response.data.message);
        console.log(error.response.data.message);
      });
  }

  return (
    <div className="login-container">
      <div className="login">
        <div className="title">
          {" "}
          <span>LogIn</span>{" "}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="details">
            <span>Enter your Email</span>
            <input type="email" placeholder="email" name="email" />
            <span>Enter your Password</span>
            <input type="password" placeholder="password" name="password" />
            <button type="submit">Continue</button>
          </div>
        </form>
        <Link className="link" to="/signup">
          <div className="desc">
            <button> Don't have an account? Signup</button>
          </div>
        </Link>
        <span>
          {error && (
            <Alert
              severity="error"
              onClose={() => {
                setError("");
              }}
            >
              {error}
            </Alert>
          )}
        </span>
      </div>
    </div>
  );
};

export default Login;
