import React, { useState, useEffect } from "react";
import OrderedProducts from "./OrderedProducts";

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if(localStorage.getItem("user") == null){
      window.location.pathname = "login"
    }
    let fetchOrders = async () => {
      await fetch(`${import.meta.env.VITE_API_URL}/fetchOrders`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          token: JSON.parse(localStorage.getItem("user")).token,
        },
      }).then(async (e) => {
        let json = await e.json();
        setOrders(json);
      });
    };
    fetchOrders()
  }, []);
  return (
    <>
      <div className=" flex w-full h-20 ">
        <button className=" border rounded p-2 h-1/2 m-auto hover:bg-black transition cursor-pointer hover:text-white " onClick={()=>{
          window.location.pathname = "inventory"
        }}>Inventory</button>
        <button className=" border rounded p-2 h-1/2 m-auto hover:bg-black transition cursor-pointer hover:text-white " onClick={()=>{
          localStorage.removeItem("user")
          window.location.pathname = "login"
        }}>Logout</button>
      </div>
      <div className=" flex flex-nowrap m-auto w-[99%] h-[605px] border-[1.9px] rounded ">
      {orders.length == 0 ? <span className=" text-stone-500 m-auto text-2xl ">No orders!</span> : 
      orders.map((e) => {
        console.log(e)
        return <OrderedProducts key={e.id} id={e.id} custId={e.custId} quantity={e.quantity} orderId={e.orderId} />;
      })}
      </div>
    </>
  );
}

export default Orders;
