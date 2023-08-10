import React, { useState, useEffect } from 'react';
import { getAllPatterns } from './ravelry';
import './SearchResults.css';
import Favorites from './Favorites';

function Patterns() {
  const [patterns, setPatterns] = useState([]);

  useEffect(() => {
    getAllPatterns('yarns/search.json')
      .then(data => setPatterns(data.patterns))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Patterns Page</h1>
      <p>Welcome to the patterns page!</p>
      <div className="search-results">
        {patterns.map((pattern, index) => (
            <Favorites key={index} item={pattern}/>
          // <div key={index} className="search-result">
          //   <img src={yarn.first_photo.small_url} alt={yarn.name} />
          //   <h2>{yarn.name}</h2>
          // </div>
        ))}
      </div>
    </div>
  );
        }
export default Patterns;
