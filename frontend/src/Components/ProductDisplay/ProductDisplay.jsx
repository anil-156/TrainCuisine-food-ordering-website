import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assests/star_icon.png";
import star_dull_icon from "../Assests/star_dull_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { setTotalCartAmount } from "../../redux/slice/cartSlice";
import toast from "react-hot-toast";

export const ProductDisplay = (props) => {
  const { product } = props;
  const { currentUser } = useSelector((store) => store.user);
  const { isLoggedIn } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  function addClickHandler(userId, itemId) {
    if (isLoggedIn) {
      fetch("http://localhost:4000/cart/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, itemId }),
      }).then(() => toast.success("Item Added Successfull"));

      // dispatch(setTotalCartAmount());
    } else {
      toast.error("Please Login To Continue");
    }
  }

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>

        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ₹{product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ₹{product.new_price}
          </div>
        </div>

        <div className="productdisplay-right-description">
          If you really want to make a friend, go to someone's house and eat
          with him... the people who give you their food give you their heart.
        </div>

        <div className="productdisplay-right-selectsize">
          <button onClick={() => addClickHandler(currentUser._id, product._id)}>
            ADD TO CART
          </button>
          <p className="productdisplay-right-category">
            <span>Category:</span> {product.category}
          </p>
          <p className="productdisplay-right-category">
            <span>Tags:</span> {product.subcategory}, indian
          </p>
        </div>
      </div>
    </div>
  );
};
