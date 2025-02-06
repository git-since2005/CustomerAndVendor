import React, { useState } from "react";

function Login() {
  const [cred, setCred] = useState({ username: "", password: "" });
  let inputStyles = "p-2 border-[1px] w-[25%] m-auto rounded mt-10 ";
  return (
    <div className="bg-zinc-300 flex flex-col w-[45%] h-[90%] rounded m-auto mt-35 outline-none ">
        <p className=" text-3xl m-auto mt-10 ">Login as Seller</p>
      <input
        type="text"
        className={inputStyles}
        placeholder="Username"
        name="username"
        onChange={(e) => {
            console.log(cred)
          setCred({ ...cred, "username": e.target.value });
        }}
        value={cred.username}
      />
      <input
        type="password"
        className={inputStyles}
        name="password"
        placeholder="Password"
        onChange={(e) => {
            console.log(cred)
          setCred({ ...cred, "password": e.target.value });
        }}
        value={cred.password}
      />
      <button className="p-2 border-1 w-[25%] m-auto rounded mt-8 mb-17 " onClick={async()=>{
        await fetch(`${import.meta.env.VITE_API_URL}/vendorLogin`, {
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({
                username: cred.username,
                password: cred.password
            })
        }).then(async(e)=>{
            let json = await e.json()
            if(json.status == "success"){
              localStorage.setItem("user", JSON.stringify({"token":json.token, user:"Vendor"}))
              window.location.pathname = "inventory"
            }else{
                alert(json.status)
            }
        })
      }}>Login</button>
    </div>
  );
}

export default Login;
