import React from "react";
import "./Navbar.css";
import navProfile from "../../Assests/nav-profile.svg";
import logo from "../../../../assets/logo.png";
import { SlLogout } from "react-icons/sl";
import { signOutSuccess } from "../../../../redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutHandler() {
    dispatch(signOutSuccess());
    navigate("/");
  }
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Cuisine</p>
      </div>
      <div className="nav_right">
        <button onClick={logoutHandler}>
          <SlLogout /> Logout
        </button>
        <img className="nav-profile" src={navProfile} alt="" />
      </div>
    </div>
  );
};
