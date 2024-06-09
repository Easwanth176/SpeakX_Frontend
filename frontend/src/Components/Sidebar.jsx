import React from 'react';
import { Link } from 'react-router-dom';
import './Css/Sidebar.css';
import logo from './assets/logo.png';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div>
        <img src={logo} alt="logo" />
        <nav>
          <ul>
            <li>
              <Link to={{ pathname: '/home', state: { selected: 'home' } }}>
                Home
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
              <Link to={{ pathname: '/home/messages', state: { selected: 'Messages' } }}>
                Messages
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/home/bookmarks', state: { selected: 'Bookmarks' } }}>
                Bookmarks
              </Link>

            </li>
            <li>
              <Link to={{ pathname: '/home/lists', state: { selected: 'Lists' } }}>
                Lists
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/home/profile', state: { selected: 'Profile' } }}>
                Profile
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/home/more', state: { selected: 'More' } }}>
                More
              </Link>
            </li>


            


          </ul>
          <button>Tweet</button>
        </nav>
      </div>
    </div>
  );
}
