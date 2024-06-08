import React from 'react'
import { Link } from 'react-router-dom';
import './Css/Sidebar.css';
import logo from './assets/twitter-logo.png';
export default function Sidebar() {
  return (
    <div>
        <div className="sidebar">
            <div>
            <img src={logo} alt="logo" />
            <nav>
                <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/explore">Explore</Link>
                </li>
                <li>
                    <Link to="/notifications">Notifications</Link>
                </li>
                <li>
                    <Link to="/messages">Messages</Link>
                </li>
                <li>
                    <Link to="/bookmarks">Bookmarks</Link>
                </li>
                <li>
                    <Link to="/lists">Lists</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/more">More</Link>
                </li>
                </ul>
                <button>Tweet</button>
            </nav>
            </div>
        </div>
    </div>
  )
}
