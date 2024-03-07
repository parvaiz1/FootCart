import React from 'react'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
//  components

import Header from './Components/Header';
import Home from './Components/Home';
import CartDetails from './Components/CartDetails';
import Footer from './Components/Footer';


function App() {

// let arr=[2,4,6,8,1,3,5,7,9]
// let find = arr.filter((item)=>item>=3)
// console.log(find)
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes >
      <Route path="/" element={<Home/>} />
      <Route path="/cart" element ={<CartDetails/>}/>
    </Routes>
    <Toaster />
    <Footer/>
    </BrowserRouter>
    
    
    </>
  )
}

export default App