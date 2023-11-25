import React, { useState } from "react";
import "../component css/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [m_number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const [formerror, setformError] = useState(null);
  const [formSubmit, setFormSubmit] = useState(false);
  const [passwordShown, setpasswordShown] = useState(false);
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmit(true);

    const isError = validate();
    setformError(isError);
    let loading = document.getElementById("full-screen");

    if (Object.keys(isError).length === 0) {
      const userObj = {
        name: name,
        email: email,
        m_number: m_number,
        password: password,
      };

      try {
        loading.style.display = "grid";
        const res = await axios.post("/SignUp", userObj);
        loading.style.display = "none";
        if (
          res.data === "email already present" ||
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
            localStorage.setItem("cartData", JSON.stringify([]));
            GoToHome();
          } catch (error) {
            loading.style.display = "none";
            setTimeout(() => {
              window.alert("Internal Server Error");
            }, 500);
          }
          return;
        }
      } catch (error) {
        window.alert(error);
        loading.style.display = "none";
      }
    }
  };

  const GoToHome = () => {
    navigate("/");
    props.AppStateHandle(3);
  };

  const validate = () => {
    const error = {};
    if (!name) {
      error.name = "Name is required !";
    }

    if (!email) {
      error.email = "Email is required !";
    }

    if (!m_number) {
      error.m_number = "Mobile number is required !";
    } else if (m_number.length !== 10) {
      error.m_number = "Please, Enter valid number";
    } else if (!Number(m_number)) {
      error.m_number = "Please, Enter valid number";
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
      <div className="outer-sign-up-con mt-4">
        <div className="sign-in-con">
          <h1 className="text-header">Sign Up</h1>
          <hr />
          <form
            onSubmit={(e) => {
              HandleSubmit(e);
            }}
          >
            <div className="field">
              <p className="lable">Enter name :- </p>
              <input
                type="text"
                name="name"
                value={name}
                id="sign-up-name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <i className="error-massage">{formSubmit && formerror.name}</i>
            </div>

            <div className="field">
              <p className="lable">Email address :-</p>
              <input
                type={"email"}
                name="email"
                value={email}
                id="sign-up-email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <i className="error-massage">{formSubmit && formerror.email}</i>
            </div>

            <div className="field">
              <p className="lable">Mobile number :-</p>
              <input
                type={"text"}
                name="m_number"
                value={m_number}
                id="sign-up-number"
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
              />
              <i className="error-massage">
                {formSubmit && formerror.m_number}
              </i>
            </div>

            <div className="field">
              <p className="lable">Password :-</p>
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                value={password}
                id="sign-up-password"
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

            <button id="sign-up">Sign Up</button>
          </form>
        </div>

        <hr />

        <div>
          <span>Already have account? </span>
          <Link to="/SignIn">
            <p id="sign-in-btn">Sign In</p>
          </Link>
        </div>

        <div id="full-screen">
          <div className="loading"></div>
        </div>
      </div>
    </>
  );
}
