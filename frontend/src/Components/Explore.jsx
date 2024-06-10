import React, { useState } from 'react';
import './Css/Explore.css';

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('');

  const trendingHashtags = [
    { hashtag: '#INDvsPAK', description: 'India vs Pakistan Cricket Match', posts: '150K posts' },
    { hashtag: '#Bumrah', description: 'Trending with #INDvsPAK', posts: '80K posts' },
    { hashtag: '#Panauti', description: 'Sports · Trending', posts: '15K posts' },
    { hashtag: '#Accident', description: 'Politics · Trending', posts: '51.6K posts' },
    { hashtag: '#Coding', description: 'Learn to code in 2024', posts: '100K posts' },
    { hashtag: '#ReactJS', description: 'Building with React', posts: '90K posts' },
    // Add more hashtags and descriptions as needed
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredHashtags = trendingHashtags.filter((trend) =>
    trend.hashtag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explore-container">
      <input
        type="text"
        placeholder="Search Trends"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="trending-list">
        {filteredHashtags.map((trend, index) => (
          <div key={index} className="trend-item">
            <h3>{trend.hashtag}</h3>
            <p>{trend.description}</p>
            <p>{trend.posts}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
