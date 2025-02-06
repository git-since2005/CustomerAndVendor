import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Products from "./Components/Products"
import Orders from "./Components/Orders"
import Login from "./Components/Login"
import "./App.css"

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/inventory" element={<Products />} />
        <Route path="/login" element={<Login />} />
      </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App
