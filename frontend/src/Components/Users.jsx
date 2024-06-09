import React, { useState } from 'react';
import './Css/Users.css';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    allUsers {
      id
      username
      email
      followers {
        id
      }
      following {
        id
      }
    }
  }
`;

const FOLLOW_USER = gql`
  mutation FollowUser($userId: ID!) {
    followUser(userId: $userId) {
      id
      username
      followers {
        id
      }
      following {
        id
      }
    }
  }
`;

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($userId: ID!) {
    unfollowUser(userId: $userId) {
      id
      username
      followers {
        id
      }
      following {
        id
      }
    }
  }
`;

export default function Users() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  const [followUserMutation] = useMutation(FOLLOW_USER, {
    update(cache, { data: { followUser } }) {
      cache.modify({
        fields: {
          allUsers(existingUsers = []) {
            const newUserRef = cache.writeFragment({
              data: followUser,
              fragment: gql`
                fragment NewUser on User {
                  id
                  username
                  email
                  followers {
                    id
                  }
                  following {
                    id
                  }
                }
              `
            });
            return [...existingUsers, newUserRef];
          }
        }
      });
    },
    onError: (error) => {
      console.error('Error following user:', error);
    },
  });

  const [unfollowUserMutation] = useMutation(UNFOLLOW_USER, {
    update(cache, { data: { unfollowUser } }) {
      cache.modify({
        fields: {
          allUsers(existingUsers = [], { readField }) {
            return existingUsers.filter(user => {
              const userId = readField('id', user);
              return userId !== unfollowUser.id;
            });
          }
        }
      });
    },
    onError: (error) => {
      console.error('Error unfollowing user:', error);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = data.allUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isFollowing = (user) => {
    return user.following.some(follow => follow.id === localStorage.getItem('userId'));
  };

  const handleFollowUser = (userId) => {
    followUserMutation({ variables: { userId } });
  };

  const handleUnfollowUser = (userId) => {
    unfollowUserMutation({ variables: { userId } });
  };

  return (
    <div className="users-container">
      <h1>Users</h1>
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
            <p>Followers: {user.followers.length}</p>
            {localStorage.getItem('userId') !== user.id && (
              <>
                {isFollowing(user) ? (
                  <button onClick={() => handleUnfollowUser(user.id)}>Unfollow</button>
                ) : (
                  <button onClick={() => handleFollowUser(user.id)}>Follow</button>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="premium">
        <h3>Subscribe to Premium</h3>
        <p>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
        <button>subscribe</button>
      </div>

        <div className="hapening">
          
Whats happening
India vs Pakistan
Cricket
·
LIVE
Sports · Trending
#INDvsPAK
Trending with Bumrah, Pakistan
Sports · Trending
#Panauti
15K posts
Politics · Trending
Accident
51.6K posts
        </div>

    </div>
  );
}
