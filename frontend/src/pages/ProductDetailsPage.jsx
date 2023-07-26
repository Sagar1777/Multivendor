import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { productData } from "../static/data";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { id } = useParams();
  // console.log("name:",name)
  const [data, setData] = useState(null);
  // const productName =  name.replace(/-/g, " ");
  // console.log("product name:", productName)

  useEffect(() => {
    const data = allProducts?.find((i) => i._id === id);
    setData(data); // Set data to null if product is not found
  }, [data,allProducts]);

  return (
    <div>
      <Header />
      {data ? (
        <ProductDetails data={data} />
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;
