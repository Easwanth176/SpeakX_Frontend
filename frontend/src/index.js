import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Register from './Components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
