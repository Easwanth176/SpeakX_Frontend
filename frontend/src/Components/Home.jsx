import React from 'react'
import Sidebar from './Sidebar';
import './Css/Home.css';
import Tweet from './Tweet';
import Users from './Users';
export default function home() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className='home-container'>
      <div className="left-container">
      <Sidebar />
      <button onClick={handleLogout}>Logout</button>
      </div>
     <Tweet />
     <Users />
    </div>
  )
}