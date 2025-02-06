import React, { useState, useEffect } from "react";
import Product from "./Product"

function Browse() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let fetchEvery = async () => {
      await fetch("https://fakestoreapi.com/products").then(async (e) => {
        let json = await e.json();
        setProducts(json);
      });
    };
    fetchEvery()
  }, []);
  return (
  <>
  <div className=" flex flex-col m-auto h-fit w-[70%] bg-stone-200 ">
    <p className=" text-2xl m-auto ">Order now!</p>
    <div className=" m-auto flex-col gap-5 ">
    {products.map((e)=>{
        return <Product key={e.id} price={e.price} id={e.id} img={e.image} title={e.title} />
    })}
    </div>
  </div>
  </>);
}

export default Browse;
