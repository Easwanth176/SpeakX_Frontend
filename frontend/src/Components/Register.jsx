import React from 'react';
import { Link } from 'react-router-dom';
import './Css/Register.css'
import  logo from './assets/twitter-logo.png' 
export default function Register() {
  return (
    <div className='container'>
      <img src={logo} alt="" />
      <h3>Register</h3>
      <form >
        <label>
          Username:
          <input type="text" required />
        </label>
        <label>
          Email:
          <input type="email"  required />
        </label>
        <label>
          Password:
          <input type="password" required />
        </label>
        <button type="submit">Register</button>
      </form>
      <div className="register">
      <p>Already have an account?<Link to="/login"> Login</Link></p>
      
      </div>
     
    </div>
  );
}