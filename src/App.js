import React from 'react';
// import Header from "./common/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from  "./components/login/Login";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route  path="/home" element={<Home />}/>
    <Route  path="/products" element={<product />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App