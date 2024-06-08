import React from 'react'
import './Css/Tweet.css';
export default function Tweet() {
  return (
    <div className='tweets'>
        <div className="tweet-container">
            <div className="tweet-header">
            <h3>Home</h3>
            </div>
            <div className="tweet-body">

            <div className="tweet">
                <div className="tweet-header">
                <img src="https://via.placeholder.com/50" alt="profile" />
                <h4>Username</h4>
                </div>
                <div className="tweet-content">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolorem inventore deleniti sequi perspiciatis ipsum aut expedita. Ut, exercitationem quia, odit velit laborum qui consequuntur deleniti veniam error voluptas ducimus quaerat officiis fugit voluptatum in voluptate quis delectus. Doloremque libero eius minus magni, provident, molestiae maxime sapiente praesentium dolores atque nisi quae quisquam, quibusdam optio eum. Dolores autem et distinctio beatae quam consequuntur quisquam perspiciatis quos doloribus fugiat repudiandae enim consectetur alias expedita ipsa natus, aliquam officiis. Fugit architecto at, consectetur similique consequatur, quibusdam corporis voluptatem nobis quis, maxime omnis ullam labore sunt eligendi quas et laboriosam maiores ipsa assumenda?
                </p>
                </div>
                <div className="tweet-footer">
                <button>Like</button>
                <button>Comment</button>
                <button>Retweet</button>
                </div>
            </div>

            
            </div>
        </div>
    </div>
  )
}
