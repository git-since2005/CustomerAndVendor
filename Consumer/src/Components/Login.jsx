import React from 'react'

function Login() {
    let inputStyle = " p-1 w-[25%] m-auto mt-10 outline-none border-[1.6px] rounded "
  return (
    <div className=" m-auto mt-[10%] w-[50%] flex flex-col bg-stone-200 ">
      <p className=" text-2xl m-auto mt-10 font-bold ">Login</p>
      <input type="text" className={inputStyle} placeholder="Email.." />
      <input type="text" className={inputStyle} placeholder="Password" />
      <button className=" m-auto border rounded p-2 mt-10 mb-15 hover:bg-black hover:text-white transition cursor-pointer ">Login</button>
    </div>
  )
}

export default Login
