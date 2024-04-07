import React, { useState } from "react";
import "../component css/SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formerror, setformError] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const [passwordShown, setpasswordShown] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmit(true);
    let loading = document.getElementById("full-screen");

    const isError = validate();
    setformError(isError);

    if (Object.keys(isError).length === 0) {
      const cheakUser = {
        email: email,
        password: password,
      };

      loading.style.display = "grid";

      try {
        const res = await axios.post(config.path + "/SignIn", cheakUser);
        loading.style.display = "none";
        // console.log(res.data)
        if (
          res.data === "invalid user" ||
          res.data === "error occured at server side"
        ) {
          setTimeout(() => {
            window.alert(res.data);
          }, 500);
        } else {
          try {
            if (
              localStorage.getItem("auth") == null ||
              localStorage.getItem("auth").length === 0
            ) {
              localStorage.setItem("auth", "");
            }
            if (
              localStorage.getItem("authData") == null ||
              localStorage.getItem("authData").length === 0
            ) {
              localStorage.setItem("authData", "");
            }

            localStorage.setItem("auth", JSON.stringify(true));
            localStorage.setItem("authData", JSON.stringify(res.data));

            setTimeout(() => {
              GoToHome();
            }, 500);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        loading.style.display = "none";
        setTimeout(() => {
          window.alert("Internal Server Error");
        }, 500);
      }
    }
  };

  const GoToHome = () => {
    navigate("/");
    props.AppStateHandle(10);
  };

  const validate = () => {
    const error = {};

    if (!email) {
      error.email = "Email is required !";
    }

    if (!password) {
      error.password = "Password is required !";
    } else if (password.length < 8) {
      error.password = "Length is must greater than 8 character!";
    }
    return error;
  };

  const makePasswordVisible = () => {
    if (passwordShown) {
      setpasswordShown(false);
    } else {
      setpasswordShown(true);
    }
  };

  return (
    <>
      <div className="outer-sign-in-con mt-5">
        <div className="sign-in-con">
          <h1 className="text-header">Sign In</h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="field">
              <p className="lable">Email address</p>
              <input
                type={"email"}
                name="email"
                value={email}
                id="sign-in-email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <i className="error-massage">{formSubmit && formerror.email}</i>
            </div>

            <div className="field">
              <p className="lable">Password</p>
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                value={password}
                id="sign-in-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input type={"checkbox"} onChangeCapture={makePasswordVisible} />
              <label style={{ marginLeft: "7px" }}>show password</label>
              <i className="error-massage">
                {formSubmit && formerror.password}
              </i>
            </div>

            <button id="sign-in">Sign In</button>
          </form>
        </div>

        <hr />

        <div>
          <span>Don't have an account yet? </span>
          <Link to={"/SignUp"}>
            <p id="sign-up-btn">Sign Up</p>
          </Link>
        </div>
        <div id="full-screen">
          <div className="loading"></div>
        </div>
      </div>
    </>
  );
}
