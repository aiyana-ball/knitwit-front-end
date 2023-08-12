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
      <h1>~Patterns~</h1>
      <div className="search-results">
        {patterns.map((pattern, index) => (
            <Favorites key={index} item={pattern}/>
        ))}
      </div>
    </div>
  );
}

export default Patterns;
