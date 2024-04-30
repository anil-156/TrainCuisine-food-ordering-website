import React from "react";
import "./Offer.css";
import exclusive_image from "../Assests/chef_logo.png";
export const Offer = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCT</p>
        <button>check Now</button>
      </div>

      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  );
};
