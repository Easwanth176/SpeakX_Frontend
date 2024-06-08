import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import client from './apolloClient';
import './index.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import Sidebar from './Components/Sidebar';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Home/>} />
          <Route path='/Sidebar' element={<Sidebar/>} />
        </Routes>
      </BrowserRouter>
     </ApolloProvider>

  </React.StrictMode>
);

