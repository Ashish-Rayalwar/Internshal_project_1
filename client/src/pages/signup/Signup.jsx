import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.scss";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { api, header } from "../../api/api";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(api);
    let formData = new FormData(e.target);
    const userCredentials = Object.fromEntries(formData);
    console.log(formData);
    setError("");
    axios
      .post(api.signup, userCredentials, header)
      .then((response) => {
        console.log(response.data.data);
        window.alert(response.data.message);
        navigate("/login");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
        // window.alert(error.response.data.message);
      });
  }
  return (
    <div className="signup-container">
      <div className="signup">
        <div className="title">
          {" "}
          <span>SignUp</span>{" "}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="details">
            <span>Enter your Name</span>
            <input type="text" placeholder="name" name="name" />
            <span>Enter your Email</span>
            <input type="email" placeholder="email" name="email" />
            <span>Enter your Password</span>
            <input type="password" placeholder="password" name="password" />
            <button type="submit">Continue</button>
          </div>
        </form>
        <div className="desc">
          <button>
            {" "}
            <Link className="link" to="/login">
              Already have an account ? LogIn
            </Link>
          </button>
        </div>
        {error && (
          <span>
            <Alert
              severity="error"
              onClose={() => {
                setError("");
              }}
            >
              {error}
            </Alert>
          </span>
        )}
      </div>
    </div>
  );
};

export default Signup;
