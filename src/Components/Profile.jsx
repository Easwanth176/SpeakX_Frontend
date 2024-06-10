import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_TWEETS } from './Graphql';
import './Css/Profile.css';
import defaultProfileImage from './assets/Default.png';
import easwanth176 from './assets/easwanth176.jpg';
import Aaradhya143 from './assets/Aaradhya143.jpg';
import pavan49 from './assets/Pavan.png';
import kiran078 from './assets/Kiran.png';
import sree026 from './assets/Sree.png';
import sasank1221 from './assets/Sasank.gif';
import abhi3442 from './assets/Abhi.png';
import coverImage from './assets/cover.jpeg'; // Update with your actual cover image path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserFriends, faHeart, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER);
  const { loading: tweetsLoading, error: tweetsError, data: tweetsData } = useQuery(GET_TWEETS);

  if (userLoading || tweetsLoading) return <p>Loading...</p>;
  if (userError) {
    console.error('Error fetching user data:', userError);
    return <p>Error: {userError.message}</p>;
  }
  if (tweetsError) {
    console.error('Error fetching tweets:', tweetsError);
    return <p>Error: {tweetsError.message}</p>;
  }

  console.log('Fetched user data:', userData);
  console.log('Fetched tweets data:', tweetsData);

  if (!userData || !userData.user) {
    console.error('No user data found:', userData);
    return <p>No user data found.</p>;
  }

  const { id: userId, username, followers, following } = userData.user;

  const userTweets = tweetsData.allTweets.filter(tweet => tweet.user.id === userId);

  const getProfileImage = (username) => {
    switch (username) {
      case 'easwanth176':
        return easwanth176;
      case 'Aaradhya143':
        return Aaradhya143;
      case 'pavan49':
        return pavan49;
      case 'kiran078':
        return kiran078;
      case 'sree026':
        return sree026;
      case 'sasank1221':
        return sasank1221;
      case 'abhi3442':
        return abhi3442;
      default:
        return defaultProfileImage;
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-page-header">
        <div className="profile-page-cover-image" style={{ backgroundImage: `url(${coverImage})` }}></div>
        <img
          src={getProfileImage(username)}
          alt="profile"
          className="profile-page-image"
          onError={(e) => {
            e.target.src = defaultProfileImage;
          }}
        />
        <div className="profile-page-details">
          <h1>{username}</h1>
          <p>@{username}</p>
        </div>
        <div className="profile-page-stats">
          <div>
            <FontAwesomeIcon icon={faUsers} style={{ marginRight: '5px' }} />
            <span>{followers.length}</span> Followers
          </div>
          <div>
            <FontAwesomeIcon icon={faUserFriends} style={{ marginRight: '5px' }} />
            <span>{following.length}</span> Following
          </div>
        </div>
      </div>
      <div className="profile-page-tweets-list">
        {userTweets.map(tweet => (
          <div key={tweet.id} className="profile-page-tweet">
            <img
              src={getProfileImage(tweet.user.username)}
              alt="tweet profile"
              className="profile-page-tweet-profile-image"
              onError={(e) => {
                e.target.src = defaultProfileImage;
              }}
            />
            <div className="profile-page-tweet-content">
              <p>{tweet.text}</p>
              <p>By: {tweet.user.username}</p>
              <div className="profile-page-tweet-icons">
                <div>
                  <FontAwesomeIcon icon={faHeart} style={{ marginRight: '5px' }} />
                  {tweet.likes ? tweet.likes.length : 0}
                </div>
                <div>
                  <FontAwesomeIcon icon={faRetweet} style={{ marginRight: '5px' }} />
                 <p>{tweet.retweets ? tweet.retweets.length : 0}</p> 
                </div>
                <div>
                  <FontAwesomeIcon icon={faComment} style={{ marginRight: '5px' }} />
                  {tweet.comments ? tweet.comments.length : 0}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;

