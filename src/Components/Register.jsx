import React, { useState } from 'react';
import { Link} from 'react-router-dom';
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

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: data => {
      console.log(data);
      alert('Registration successful! Please log in.');
      window.location.href = '/login';
    }
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    registerUser({ variables: formData });

  }

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
