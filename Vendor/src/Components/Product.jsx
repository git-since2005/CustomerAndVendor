import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

function Product(props) {
  const [quantity, setQuantity] = useState(0);
  const [show, setShow] = useState(false);
  async function getQuantity(ids) {
    try {
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
  useState(() => {
    getQuantity(props.id);
  }, []);

  return (
    <div className=" flex-col ">
      <div
        className=" p-2 mt-1 mb-1 rounded flex h-fit hover:bg-stone-200 cursor-pointer "
        onClick={() => {
          setShow(!show);
        }}
      >
        <p className="text-xl">
          {props.id}.{props.title}
        </p>
        <p className="text-lg ml-auto ">Quantity: {quantity}</p>
        <IoIosArrowDown className={` m-auto ml-0 mr-0 transition ${show?"rotate-[180deg]":"rotate-[0deg]"} `} />
      </div>
      {show && <div className=" flex h-fit w-full gap-3 transition ">
        <input type="text" value={quantity} onChange={(e)=>{
          setQuantity(e.target.value)
        }} className=" p-2 ml-20 outline-none border rounded " placeholder="Set quantity..." />
        <button className=" border rounded p-1 text-base " onClick={async()=>{
          await fetch(`${import.meta.env.VITE_API_URL}/setQuantity`,{
            method:"POST",
            headers:{
              token:JSON.parse(localStorage.getItem("user")).token,
              "Content-type":'application/json'
            },
            body:JSON.stringify({
              id:props.id,
              quantity:quantity
            })
          }).then(async(e)=>{
            let json = await e.json()
            if(json.status =="success"){
              window.location.reload()
            }
          })
        }}>Set Quantity</button>  
      </div>}
    </div>
  );
}

export default Product;
