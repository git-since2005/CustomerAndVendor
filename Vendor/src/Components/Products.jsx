import React, { useEffect, useState } from "react";
import Product from "./Product";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function Products() {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    let fetchProducts = async () => {
      await fetch("https://fakestoreapi.com/products/")
        .then(async (e) => {
          let json = await e.json();
          setProduct(json);
          console.log(json);
        })
        .catch(async (e) => {
          console.log(e);
        });
    };
    fetchProducts();
  }, []);

  return (
    <div className="m-5">
      <div className="flex">
      <IoArrowBackCircleSharp size={40} className=" m-auto mb-0 mr-0 ml-0 cursor-pointer " onClick={()=>{
        window.location.pathname = "/"
      }} />
      <p className=" text-5xl ">Available Products</p>
      </div>
      {products.map((e) => {
        console.log(e.id)
        return <Product key={e.id} id={e.id} title={e.title} />;
      })}
    </div>
  );
}

export default Products;
