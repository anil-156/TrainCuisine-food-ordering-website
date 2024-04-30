import React, { useState } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from "../Components/Assests/dropdown_icon.png";
import { Item } from "../Components/Item/Item";
import { useSelector } from "react-redux";
import { Navbar } from "../Components/Navbar/Navbar";

export const ShopCategory = (props) => {
  const { allProduct } = useSelector((store) => store.cartData);

  const [showMore, setShowMore] = useState(false);

  const breakfast = [];
  const lunch = [];
  const dinner = [];

  allProduct.map((item) => {
    if (item.subcategory == "breakfast" && item.category == props.category) {
      breakfast.push(item);
    } else if (item.subcategory == "lunch" && item.category == props.category) {
      lunch.push(item);
    } else if (
      item.subcategory === "dinner" &&
      item.category == props.category
    ) {
      dinner.push(item);
    }
  });

  function showMoreHandler(e) {
    setShowMore((prev) => !prev);
  }

  return (
    <div>
      <Navbar />
    
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-subcategory">
        <h2>Breakfast</h2>
        <hr />
        <div className="shopcategory-products">
          {showMore
            ? breakfast.slice(0, 8).map((item, i) => {
                return <Item key={i} item={item} />;
              })
            : breakfast.slice(0, 4).map((item, i) => {
                return <Item key={i} item={item} />;
              })}
        </div>
      </div>

      <div className="shopcategory-subcategory">
        <h2>Lunch</h2>
        <hr />
        <div className="shopcategory-products">
          {showMore
            ? lunch.slice(0, 8).map((item, i) => {
                return <Item key={i} item={item} />;
              })
            : lunch.slice(0, 4).map((item, i) => {
                return <Item key={i} item={item} />;
              })}
        </div>
      </div>

      <div className="shopcategory-subcategory">
        <h2>Dinner</h2>
        <hr />
        <div className="shopcategory-products">
          {showMore
            ? dinner.slice(0, 8).map((item, i) => {
                return <Item key={i} item={item} />;
              })
            : dinner.slice(0, 4).map((item, i) => {
                return <Item key={i} item={item} />;
              })}
        </div>
      </div>

      <div onClick={showMoreHandler} className="shopcategory-loadmore">
        {showMore ? "Show Less" : "Explore More"}
      </div>
    </div>
    </div>
  );
};
