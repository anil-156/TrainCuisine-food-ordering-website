import React from "react";
import { useSelector } from "react-redux";
import { Cart } from "../../Pages/Cart";
import { useNavigate } from "react-router-dom";

const CartContainer = () => {
  const { cartItems } = useSelector((store) => store.cartData);
  const navigate = useNavigate();
  return (
    <div>
      {!cartItems.length == 0 ? (
        <Cart />
      ) : (
        <div className="no_item_cart">
          <p>No item in cart(0)</p>
          <button onClick={() => navigate("/")}>Order Now </button>
        </div>
      )}
    </div>
  );
};

export default CartContainer;
