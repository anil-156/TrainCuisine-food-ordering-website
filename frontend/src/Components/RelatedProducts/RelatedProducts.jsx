import React from "react";
import "./RelatedProducts.css";
import { useSelector } from "react-redux";
import { Item } from "../Item/Item";

export const RelatedProducts = () => {
  const { allProduct } = useSelector((store) => store.cartData);
  return (
    <div className="relatedproducts">
      <h1>Try Something New</h1>
      <hr />

      <div className="relatedproducts-item">
        {allProduct
          .filter((item) => item.foodtype == "streetfood")
          .slice(-4)
          .map((item, i) => {
            return <Item key={i} id={item.id} item={item} />;
          })}
      </div>
    </div>
  );
};
