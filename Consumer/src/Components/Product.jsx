import React, { useState } from "react";

function Product(props) {
  const [showInput, setShowInput] = useState(false);
  const [number, setNumber] = useState(1)
  return (
    <>
      <div
        className=" bg-white h-[15%] flex w-[55%] hover:scale-[1.1]  cursor-pointer transition rounded m-auto mt-5 "
        onClick={() => {
          setShowInput(!showInput);
        }}
      >
        <img
          src={props.img}
          className=" h-[100px] rounded ml-2 w-[100px] "
          alt=""
        />
        <div className="flex-col ml-2">
          <p className=" text-lg ">{props.title}</p>
          <p className=" text-lg font-bold ">{props.price}$</p>
        </div>
      </div>
      {showInput && (
        <div className=" bg-white m-auto transition w-[55%] h-[15%] flex ">
          <input
            placeholder="Quantity..."
            type="number"
            value={number}
            className=" p-2 transition border rounded outline-none ml-auto "
          />
          <button className=" cursor-pointer border rounded p-1 mr-auto ml-3 " onClick={async()=>{
            await fetch(`${import.meta.env.VITE_API_URL}/giveOrder`,{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    quantity:number,
                    id: props.id,
                    custId : JSON.parse(localStorage.getItem("user")).custId
                })
            }).then(async(e)=>{
                let json = await e.json()
                if(json.status=="success"){
                    alert("Order Placed")
                    window.location.reload()
                }
            })
          }}>Submit</button>
        </div>
      )}
    </>
  );
}

export default Product;
