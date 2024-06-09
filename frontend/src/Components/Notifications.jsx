import React from 'react';
import './Css/Notifications.css';
export default function Notifications() {
  return (
    <div className="notifications">
      <div className="notification-item">
        <div className="notification-icon">
          <i className="fas fa-bell"></i>
        </div>
        <div className="notification-content">
          <p className="notification-text">New message from John Doe</p>
          <p className="notification-time">2 minutes ago</p>
        </div>
      </div>

      <div className="notification-item">
        <div className="notification-icon">
          <i className="fas fa-heart"></i>
        </div>
        <div className="notification-content">
          <p className="notification-text">Sarah liked your Tweet</p>
          <p className="notification-time">5 minutes ago</p>
        </div>
      </div>

      <div className="notification-item">
        <div className="notification-icon">
          <i className="fas fa-retweet"></i>
        </div>
        <div className="notification-content">
          <p className="notification-text">Your Tweet was retweeted by Alex</p>
          <p className="notification-time">10 minutes ago</p>
        </div>
      </div>

      <div className="notification-item">
        <div className="notification-icon">
          <i className="fas fa-user-plus"></i>
        </div>
        <div className="notification-content">
          <p className="notification-text">You have a new follower</p>
          <p className="notification-time">15 minutes ago</p>
        </div>
      </div>
    </div>
  );
}
