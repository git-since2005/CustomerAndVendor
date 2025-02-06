import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

function OrderedProducts(props) {
  const [quantity, setQuantity] = useState(Number(props.quantity));
  const [show, setShow] = useState(false);
  async function getQuantity(ids) {
    try {
        setQuantity(props.quantity)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getQuantity`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          token: JSON.parse(localStorage.getItem("user")).token,
        },
        body: JSON.stringify({
          id: ids,
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }

      const data = await response.json();
      setQuantity(data[0].quantity);
      console.log(Object.keys(data));
      return data.id; // Extracting only the title
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  }

  return (
    <div className=" flex-col w-full ">
      <div
        className=" p-2 mt-1 mb-1 rounded bg-green-400 flex h-fit w-[99%] m-auto hover:bg-green-300 cursor-pointer "
        onClick={() => {
          setShow(!show);
        }}
      >
        <p className="text-xl">
          User: <span className="font-semibold ">{props.custId}  </span>
          Order ID: <span className=" font-semibold ">{props.orderId} </span>
          Product ID: <span className=" font-semibold ">{props.id}</span>
        </p>
        <p className="text-lg ml-auto ">Quantity: {quantity}</p>
        <IoIosArrowDown className={` m-auto ml-0 mr-0 transition ${show?"rotate-[180deg]":"rotate-[0deg]"} `} />
      </div>
      {show && <div className=" flex h-fit w-full gap-3 transition ">
        <button className=" border rounded p-2 text-base ml-25 bg-red-700 shadow-xl hover:translate-y-[2px] transition cursor-pointer " onClick={async()=>{
          await fetch(`${import.meta.env.VITE_API_URL}/deliver-order`,{
            method:"POST",
            headers:{
              token:JSON.parse(localStorage.getItem("user")).token,
              "Content-type":'application/json'
            },
            body:JSON.stringify({
              product : props.id,
              user:props.user,
              quantity:props.quantity,
              orderId:props.orderId
            })
          }).then(async(e)=>{
            let json = await e.json()
            if(json.status =="delivered"){
              window.location.reload()
            }
          })
        }}>Deliver</button>  
      </div>}
    </div>
  );
}

export default OrderedProducts;
