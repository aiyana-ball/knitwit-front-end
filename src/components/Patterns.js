import React, { useState, useEffect } from 'react';
import { getAllPatterns } from './ravelry';
import './SearchResults.css';

function Patterns() {
  const [patternData, setPatternData] = useState(null);

  useEffect(() => {
    getAllPatterns()
      .then(data => setPatternData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  if (!patternData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Patterns Page</h1>
      <p>Welcome to the patterns page!</p>
      <div className="search-results">
        {patternData.patterns.map((result, index) => (
          <div key={index} className="search-result">
            <img src={result.first_photo.small_url} alt={result.name}/>
            <h2>{result.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Patterns;