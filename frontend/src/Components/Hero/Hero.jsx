import React from "react";
import "./Hero.css";
import hand_icon from "../Assests/hand_icon.png";
import arrow_icon from "../Assests/arrow.png";
import food_template from "../../assets/hero_icon.webp";

export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Hunger</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>DELICIOUS FOOD</p>
          <p>fOR EVERYONE</p>
        </div>

        <div className="hero-latest-btn">
          <div>Fresh Food</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>

      <div className="hero-right">
        <img src={food_template} alt="" />
      </div>
    </div>
  );
};
