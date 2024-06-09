import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from './Graphql'; // Define your query for getting user details

export default function Profile() {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { username, email, joined, tweets, followers, following } = data.user; // Adjust according to your schema

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <p>Username: <span>{username}</span></p>
      <p>Email: <span>{email}</span></p>
      <p>Joined: <span>{joined}</span></p>
      <p>Followers: <span>{followers.length}</span></p>
      <p>Following: <span>{following.length}</span></p>
      <h2>Tweets Posted:</h2>
      <div className="tweets-list">
        {tweets.map(tweet => (
          <div key={tweet.id} className="tweet">
            <p>{tweet.text}</p>
            <p>By: {tweet.user.username}</p>
            <p>Likes: {tweet.likes.length}</p>
            <p>Retweets: {tweet.retweets.length}</p>
            <p>Comments:</p>
            <ul>
              {tweet.comments.map(comment => (
                <li key={comment.id}>
                  <p>{comment.text}</p>
                  <p>By: {comment.user.username}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button>Logout</button>
    </div>
  );
}
