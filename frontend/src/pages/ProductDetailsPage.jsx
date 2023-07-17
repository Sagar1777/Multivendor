import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { productData } from "../static/data";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { products } = useSelector((state) => state.products);
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName =  name.replace(/-/g, " ");

  useEffect(() => {
    const data = products.find((i) => i.name === productName);
    setData(data); // Set data to null if product is not found
  }, []);

  return (
    <div>
      <Header />
      {data ? (
        <ProductDetails data={data} />
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;
