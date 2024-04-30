import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setIsAdmin,
  setIsLoggedIn,
  signInSuccess,
} from "../redux/slice/userSlice";
import toast from "react-hot-toast";

export const LoginSignup = () => {
  const [loginState, setLoginState] = useState("Login");
  const [secretKey, setSecretKey] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    userType: "",
  });

  const changeHandler = (e) => {
    setUserDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const login = async () => {
    let responseData;

    await fetch("http://localhost:4000/api/userlogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success && responseData.userType == "admin") {
      localStorage.setItem("token", responseData.token);
      dispatch(signInSuccess(responseData.user));
      dispatch(setIsLoggedIn(true));
      dispatch(setIsAdmin(true));
      toast.success("Sign In Successfull");
      navigate("/admin");
    } else if (responseData.success) {
      localStorage.setItem("token", responseData.token);
      dispatch(signInSuccess(responseData.user));
      dispatch(setIsLoggedIn(true));
      toast.success("Sign In Successfull");
      navigate("/");
    } else {
      toast.error("Something Went Wrong");
    }
  };

  const signup = async () => {
    let responseData;

    if (userDetails.userType == "admin" && secretKey !== "SADA95") {
      window.alert("Secret Key Invalid");
    } else {
      await fetch("http://localhost:4000/api/usersignup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      })
        .then((res) => res.json())
        .then((data) => (responseData = data));

      if (responseData.success) {
        toast.success("Registration Successfull");
        setLoginState("Login");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{loginState}</h1>

        {/* displaying the userTypes  */}
        {loginState == "Sign Up" ? (
          <div>
            <div className="user-type">
              UserType:
              <input
                type="radio"
                name="userType"
                value="user"
                onChange={changeHandler}
              />
              User
              <input
                type="radio"
                name="userType"
                value="admin"
                onChange={changeHandler}
              />
              Admin
            </div>

            {/* displaying the secret input field */}
            {userDetails.userType == "admin" ? (
              <div className="admin-secret">
                <input
                  type="text"
                  placeholder="Secret Key"
                  onChange={(e) => setSecretKey(e.target.value)}
                />
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="loginsignup-fields">
          {loginState === "Sign Up" ? (
            <input
              onChange={changeHandler}
              value={userDetails.username}
              name="username"
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            onChange={changeHandler}
            name="email"
            value={userDetails.email}
            type="email"
            placeholder="Email Address"
          />
          <input
            onChange={changeHandler}
            name="password"
            value={userDetails.password}
            type="password"
            placeholder="Password"
          />
        </div>

        <button
          onClick={() => {
            loginState === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {loginState === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setLoginState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setLoginState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
