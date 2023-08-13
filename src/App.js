import React, { Component } from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from './Pages/Login.js';
import Home from './Pages/Home.js';
import Signup from './Pages/Signup.js';
import Sale from './Pages/Sale.js';
import Products from './Pages/Products.js';
import Customers from './Pages/Customers.js';
import './style/main.css';

function App() {
  return (
    <div className="App">
       <BrowserRouter> 
       <Routes>
    <Route path ='/' element ={<Home/>}/>
    
    <Route path ='/Sale' element ={<Sale/>}/>
    <Route path ='/Products' element ={<Products/>}/>
    <Route path ='/Customers' element ={<Customers/>}/>
    <Route path ='/Signup' element ={<Signup/>}/>
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
