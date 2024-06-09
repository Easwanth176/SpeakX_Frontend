import React, { useState } from 'react';
import './Css/Users.css';
import { gql, useQuery } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    allUsers {
      id
      username
      email
    }
  }
`;

export default function Users() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = data.allUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <h1>Users</h1>
      <p>Users page content</p>
      <input
        type="text"
        placeholder="Search Users"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="users-list">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
