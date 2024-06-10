import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import './Css/Login.css';
import logo from './assets/logo.png';

const REGISTER_USER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

const Register = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await registerUser({ variables: formData });
      if (data && data.register) {
        alert('Registration successful! Please log in.');
        navigate('/login'); // Navigate to login page
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="logo" />
      <h3>Sign up for Twitter</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="register">
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
};

export default Register;
