import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import './Css/Sidebar.css';
import logo from './assets/logo.png';
import { GET_USER } from './Graphql';

export default function Sidebar() {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { username } = data.user;

  return (
    <div className="sidebar">
      <div>
        <img src={logo} alt="logo" />
        <div className="user">
          <h3>{username}</h3>
          <p>@{username}</p>
        </div>
        
        <nav>
          <ul>
            <li>
              <Link to={{ pathname: '/home', state: { selected: 'home' } }}>
                Home
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/home/premium', state: { selected: 'Premium' } }}>
                Premium
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/home/explore', state: { selected: 'explore' } }}>
                Explore
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/home/notifications', state: { selected: 'Notifications' } }}>
                Notifications
              </Link>
            </li>

            <li>
              <Link to={{ pathname: '/home/profile', state: { selected: 'Profile' } }}>
                Profile
              </Link>
            </li>
            <div className="tweet-button">
              <button>
                <Link to={{ pathname: '/home', state: { selected: 'home' } }}>
                  Tweet
                </Link>
              </button>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}
