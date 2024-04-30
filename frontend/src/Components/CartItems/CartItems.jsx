import "./CartItems.css";
import remove_icon from "../Assests/cart_cross_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { setTotalCartAmount, setcartItems } from "../../redux/slice/cartSlice";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

export const CartItems = () => {
  const { totalCartAmount } = useSelector((store) => store.cartData);
  const { isLoggedIn } = useSelector((store) => store.user);
  const { currentUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [cart, setCart] = useState(null);
  const [pnr,setPnr] = useState(null)

  // Cartitem Display
  function fetchCartItems() {
    fetch("http://localhost:4000/cart/fetchcartitem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: currentUser._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.fetchedData.cartData);
        dispatch(setcartItems(data.fetchedData.cartData));
        dispatch(setTotalCartAmount());
      });
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  //  Delete from cart --------------------------------------------
  function deleteFromCart(userId, itemId) {
    if (isLoggedIn) {
      fetch("http://localhost:4000/cart/deletefromcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, itemId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success == true) {
            toast.success("Item Deleted Successfull");
            fetchCartItems();
          } else {
            toast.error("Something went wrong");
          }

          dispatch(setTotalCartAmount());
        });
    } else {
      toast.error("Please Login To Continue");
    }
    
  }

  // payment handler -----------------------------------------------
  async function checkoutHandler() {
    if (isLoggedIn) {
      if(pnr && pnr.length>8){
      
      const stripe = await loadStripe(
        "pk_test_51OzX7rSJWr8nuJrVbWtCm0XEE9na58NZer6WicBo174I922HINdUrQzbiNWnJNexLCMxaiKjRP4Pe1hSEsJ3hEV700c3JQSAE2"
      );

      const response = await fetch(
        "http://localhost:4000/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cart),
        }
      );
      const session = await response.json();
      console.log("session", session);

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } else{
      toast.error("Please Enter PNR Number")
    }

  }else {
    toast.error("Please Login To Continue");
  }
}
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {!cart ? (
        <h2>No Item in Cart</h2>
      ) : (
        cart.map((item) => {
          return (
            <div key={item._id}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={item.foodDetail.image}
                  alt=""
                  className="carticon-product-icon"
                />
                <p>{item.foodDetail.name}</p>
                <p>₹{item.foodDetail.new_price}</p>
                <button className="cartitems-quantity">{item.quantity}</button>
                <p>₹{item.foodDetail.new_price * item.quantity}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    deleteFromCart(currentUser._id, item.foodDetail._id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        })
      )}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{totalCartAmount}</p>
            </div>
            <hr />

            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />

            <div className="cartitems-total-item">
              <h3>Total</h3>
              <p>₹{totalCartAmount}</p>
            </div>
            <hr />
          </div>

          <button onClick={checkoutHandler}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code , Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>

          <div className="cartitems-pnr">
            <p>
              Please enter your correct PNR Number <span>*</span>{" "}
            </p>
            <div className="cartitems-promobox">
              <input type="text" placeholder="PNR Number" required onChange={(e)=>setPnr(e.target.value)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
