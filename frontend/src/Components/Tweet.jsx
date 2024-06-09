import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import './Css/Tweet.css';
import { 
  GET_TWEETS, 
  DELETE_TWEET, 
  CREATE_TWEET, 
  LIKE_TWEET, 
  CREATE_COMMENT, 
  DELETE_COMMENT 
} from './Graphql';

export default function Tweet() {
  const { loading, error, data, refetch } = useQuery(GET_TWEETS);
  const [deleteTweet] = useMutation(DELETE_TWEET, {
    refetchQueries: [{ query: GET_TWEETS }],
  });
  const [createTweet] = useMutation(CREATE_TWEET, {
    refetchQueries: [{ query: GET_TWEETS }],
    onError: (error) => {
      console.error('Error creating tweet:', error.message);
    },
  });
  const [likeTweet] = useMutation(LIKE_TWEET, {
    refetchQueries: [{ query: GET_TWEETS }],
  });
  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: GET_TWEETS }],
  });
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [{ query: GET_TWEETS }],
  });

  const [newTweetText, setNewTweetText] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentTweetId, setCommentTweetId] = useState(null);

  const handleDeleteTweet = (id) => {
    deleteTweet({ variables: { id } })
      .then((res) => {
        console.log('Tweet deleted successfully:', res.data.deleteTweet);
      })
      .catch((error) => {
        console.error('Error deleting tweet:', error.message);
      });
  };

  const handleCreateTweet = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }
      const { data } = await createTweet({
        variables: { text: newTweetText },
        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      if (data && data.createTweet) {
        setNewTweetText('');
        refetch();
      }
    } catch (error) {
      console.error('Error creating tweet:', error.message);
    }
  };

  const handleLikeTweet = (id) => {
    likeTweet({ variables: { id } })
      .then((res) => {
        console.log('Tweet liked successfully:', res.data.likeTweet);
      })
      .catch((error) => {
        console.error('Error liking tweet:', error.message);
      });
  };

  const handleCreateComment = async (tweetId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }
      const { data } = await createComment({
        variables: { text: newCommentText, tweetId },
        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      if (data && data.createComment) {
        setNewCommentText('');
        setCommentTweetId(null);
        refetch();
      }
    } catch (error) {
      console.error('Error creating comment:', error.message);
    }
  };

  const handleDeleteComment = (id) => {
    deleteComment({ variables: { id } })
      .then((res) => {
        console.log('Comment deleted successfully:', res.data.deleteComment);
      })
      .catch((error) => {
        console.error('Error deleting comment:', error.message);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='tweets'>
      <div className="tweet-container">
        <div className="tweet-header">
          <h3>Home</h3>
        </div>
        <div className="tweet-body">
          <div className="new-tweet">
            <textarea
              placeholder="What's happening?"
              value={newTweetText}
              onChange={(e) => setNewTweetText(e.target.value)}
            />
            <button onClick={handleCreateTweet}>Tweet</button>
          </div>
          {data.allTweets.map((tweet) => (
            <div className="tweet" key={tweet.id}>
              <div className="tweet-header">
                <img src="https://via.placeholder.com/50" alt="profile" />
                <h4>{tweet.user.username}</h4>
              </div>
              <div className="tweet-content">
                <p>{tweet.text}</p>
              </div>
              <div className="tweet-footer">
                <button onClick={() => handleLikeTweet(tweet.id)}>Like ({tweet.likes.length})</button>
                <button onClick={() => setCommentTweetId(tweet.id)}>Comment</button>
                <button>Retweet</button>
                {localStorage.getItem('userId') === tweet.user.id && (
                  <button onClick={() => handleDeleteTweet(tweet.id)}>Delete</button>
                )}
              </div>
              {commentTweetId === tweet.id && (
                <div className="new-comment">
                  <textarea
                    placeholder="Add a comment"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                  />
                  <button onClick={() => handleCreateComment(tweet.id)}>Comment</button>
                </div>
              )}
              <div className="comments">
                {tweet.comments.map((comment) => (
                  <div className="comment" key={comment.id}>
                    <div className="comment-header">
                      <h5>{comment.user.username}</h5>
                      <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                    </div>
                    <div className="comment-content">
                      <p>{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
