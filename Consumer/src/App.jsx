import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Browse from "./Components/Browse"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
