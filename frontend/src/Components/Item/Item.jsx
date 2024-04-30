import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

export const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.item._id}`}>
        <img onClick={window.scrollTo(0, 0)} src={props.item.image} alt="" />
      </Link>
      <p>{props.item.name}</p>

      <div className="item-price">
        <div className="item-price-new">₹{props.item.new_price}</div>

        <div className="item-price-old">₹{props.item.old_price}</div>

        <div className="offer-onprice">
          {Math.floor(
            100 *
              ((props.item.old_price - props.item.new_price) /
                props.item.old_price)
          )}
          % off
        </div>
      </div>
    </div>
  );
};
