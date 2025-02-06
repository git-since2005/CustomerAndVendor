import React, { useState, useEffect } from "react";

function Signup() {
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
    re: "",
  });
  const [button, setButton] = useState(true);
  const [exists, setExists] = useState(false);
  useEffect(() => {
    console.log(
      cred.password == cred.re &&
        cred.name.length !== 0 &&
        cred.email.length !== 0
    );
    setButton(
      !(
        cred.password == cred.re &&
        cred.name.length !== 0 &&
        cred.email.length !== 0
      )
    );
  }, [cred]);
  let inputStyle =
    " p-1 w-[25%] m-auto mt-10 outline-none border-[1.6px] rounded ";
  return (
    <div className=" m-auto mt-[7%] w-[50%] flex flex-col bg-stone-200 ">
      <p className=" text-2xl m-auto mt-10 font-bold ">SignUp</p>
      <input
        type="text"
        name="name"
        onChange={(e) => {
          setCred({ ...cred, [e.target.name]: e.target.value });
        }}
        className={inputStyle}
        placeholder="Name.."
      />
      <input
        type="text"
        name="email"
        onChange={(e) => {
          setCred({ ...cred, [e.target.name]: e.target.value });
        }}
        className={inputStyle + `${exists ? "border-red-400" : ""}`}
        placeholder="Email.."
      />
      <input
        type="password"
        name="password"
        onChange={(e) => {
          setCred({ ...cred, [e.target.name]: e.target.value });
        }}
        className={
          inputStyle + `${cred.re !== cred.password ? "border-red-400" : ""}`
        }
        placeholder="Password"
      />
      <input
        type="password"
        name="re"
        onChange={(e) => {
          setCred({ ...cred, [e.target.name]: e.target.value });
        }}
        className={
          inputStyle + `${cred.re !== cred.password ? "border-red-400" : ""}`
        }
        placeholder="Re-Password"
      />
      <button
        className=" m-auto border rounded p-2 mt-10 mb-15 hover:bg-black hover:text-white transition cursor-pointer "
        onClick={async () => {
          await fetch(`${import.meta.env.VITE_API_URL}/createUser`, {
            method: "POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                email:cred.email,
                name:cred.name,
                password:cred.password
            })
          }).then(async (e) => {
            let json = await e.json();
            console.log(e, json)
            if (json.status == "success") {
              setTimeout(() => {
                
              }, 10000);
              localStorage.setItem("user", JSON.stringify(json))
              window.location.pathname = "/";
            } else if (json.status == "email") {
              setExists(true);
            }
          });
        }}
        disabled={button}
      >
        SignUp
      </button>
    </div>
  );
}

export default Signup;
