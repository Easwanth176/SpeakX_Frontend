import React from 'react';
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="users-container">
      <h1>Users</h1>
      <p>Users page content</p>
      <input type="text" placeholder="Search Users" />
      <div className="users-list">
        {data.allUsers.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
