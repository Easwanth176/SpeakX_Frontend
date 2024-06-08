import React from 'react'
import {Link} from 'react-router-dom'

import './Css/Login.css'
import logo from './assets/twitter-logo.png' 

export default function Login() {
  return (
    <div className="container">
      <img src={logo} alt="logo" />
      <h3>Log in to Twitter</h3>
      <form>
        <div>
        <label>Username</label>
          <input type="text"/>
        </div>
        <div>
        <label>password</label>
        <input type="text"/>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="register">
      <p>Don't have an account? <Link to="/">Sign up</Link></p>
      </div>
    </div>
  )
}
