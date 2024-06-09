import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import './Css/Login.css';
import logo from './assets/logo.png';

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: data => {
      const token = data.login.token;
      localStorage.setItem('token', token);
      window.location.href = '/home';
    },
    onError: error => {
      console.error('Error logging in:', error.message);
    }
  });
  

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    loginUser({ variables: formData });
  };

  return (
    <div className="container">
      <img src={logo} alt="logo" />
      <h3>Log in to Twitter</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="register">
        <p>Don't have an account? <Link to="/">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
