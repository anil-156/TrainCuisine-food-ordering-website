import React from "react";
import { useParams } from "react-router-dom";
import { Breadcrum } from "../Components/Breadcrum/Breadcrum";
import { ProductDisplay } from "../Components/ProductDisplay/ProductDisplay";
import { DescriptionBox } from "../Components/DescriptionBox/DescriptionBox";
import { RelatedProducts } from "../Components/RelatedProducts/RelatedProducts";
import { useSelector } from "react-redux";
import { Navbar } from "../Components/Navbar/Navbar";

export const Product = () => {
  const { allProduct } = useSelector((store) => store.cartData);
  const { productId } = useParams();

  const product = allProduct.find((e) => e._id === productId);

  return (
    <div>
      <Navbar />
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};
