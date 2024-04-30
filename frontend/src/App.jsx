import { Navbar } from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Shop } from "./Pages/Shop";
import { ShopCategory } from "./Pages/ShopCategory";
import { Product } from "./Pages/Product";
import { LoginSignup } from "./Pages/LoginSignup";
import { Footer } from "./Components/Footer/Footer";
import non_veg_banner from "./assets/non_veg_banner.webp";
import veg_banner from "./assets/veg_banner.jpg";
import vegan_banner from "./assets/vegan_banner.jpg";
import Admin from "./Pages/Admin/Admin";
import { useDispatch, useSelector } from "react-redux";
import { setAllProduct } from "./redux/slice/cartSlice";
import { useEffect } from "react";
import PaymentSuccess from "./Components/Payment/PaymentSuccess";
import PaymentCancel from "./Components/Payment/PaymentCancel";
import CartContainer from "./Components/CartContainer/CartContainer";
import { Cart } from "./Pages/Cart";

function App() {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((store) => store.user);

  useEffect(() => {
    fetch("http://localhost:4000/product/allproducts")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setAllProduct(data.foodDetails));
      });
  }, []);

  return (
    <div>
      <BrowserRouter>
       
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/veg"
            element={<ShopCategory banner={veg_banner} category="veg" />}
          />
          <Route
            path="/non-veg"
            element={
              <ShopCategory banner={non_veg_banner} category="non-veg" />
            }
          />
          <Route
            path="/vegan"
            element={<ShopCategory banner={vegan_banner} category="vegan" />}
          />

          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />

          <Route path="/admin/*" element={<Admin />} />

          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
        </Routes>
        {/* {isAdmin ? null : <Footer />} */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
