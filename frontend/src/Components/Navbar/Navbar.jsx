import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import cart_icon from "../Assests/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import nav_dropdown from "../Assests/nav_dropdown.png";
import logo from "../../assets/logo.png";
import { GrLogin } from "react-icons/gr";
import { SlLogout } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../../redux/slice/userSlice";
import { clearCart } from "../../redux/slice/cartSlice";

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { isLoggedIn } = useSelector((store) => store.user);
  const { cartItems } = useSelector((store) => store.cartData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for menu icon in mediaquery for mobile
  const menuRef = useRef();

  const dropdown_toogle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Cuisine</p>
      </div>

      <img
        className="nav-dropdown"
        onClick={dropdown_toogle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          {" "}
          <Link
            style={{
              textDecoration: "none",
              color: "#626262",
            }}
            to="/"
          >
            Shop
          </Link>{" "}
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("veg");
          }}
        >
          {" "}
          <Link style={{ textDecoration: "none", color: "#626262" }} to="/veg">
            Veg
          </Link>{" "}
          {menu === "veg" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("non-veg");
          }}
        >
          {" "}
          <Link
            style={{ textDecoration: "none", color: "#626262" }}
            to="/non-veg"
          >
            Non-Veg
          </Link>{" "}
          {menu === "non-veg" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("vegan");
          }}
        >
          {" "}
          <Link
            style={{ textDecoration: "none", color: "#626262" }}
            to="/vegan"
          >
            Vegan
          </Link>{" "}
          {menu === "vegan" ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        {isLoggedIn ? (
          <button
            className="login_btn"
            onClick={() => {
              localStorage.removeItem("auth-token");
              dispatch(signOutSuccess());
              dispatch(clearCart());
              navigate("/");
            }}
          >
            <SlLogout />
            Logout
          </button>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/login">
            <button className="login_btn">
              <GrLogin />
              Login
            </button>
          </Link>
        )}
        <Link style={{ textDecoration: "none" }} to="/cart">
          <img src={cart_icon} alt="" />
        </Link>

        <div className="nav-cart-count">
          {cartItems.length === 0 ? 0 : cartItems.length}
        </div>
      </div>
    </div>
  );
};
