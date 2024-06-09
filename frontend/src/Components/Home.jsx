import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Css/Home.css';
import Tweet from './Tweet';
import Users from './Users';
import Explore from './Explore';
import Profile from './Profile';
const Home = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if token does not exist
      window.location.href = '/login';
    }
  }, []);
    console.log(localStorage.getItem('token'));
  const Component = () => {
    const { pathname, state } = location;
    const selected = state?.selected;

    switch (pathname) {
      case '/home':
        return selected === 'explore' ? <Explore /> : <Tweet />;
      case '/home/explore':
        return <Explore />;
      case '/home/profile':
        return <Profile />;
      default:
        return <Tweet />;
    }
  };

  return (
    <div className="home-container">
      <div className="left-container">
        <Sidebar />
        <button onClick={handleLogout}>Logout</button>
      </div>
   
        {Component()}
        <Users />
      
    </div>
  );
};

export default Home;
