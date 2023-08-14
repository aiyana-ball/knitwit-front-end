import React, { useState, useEffect } from 'react';
import { getAllPatterns } from './ravelry';
import './SearchResults.css';
import Favorites from './Favorites';

function Patterns() {
  const [patterns, setPatterns] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadInitialPatterns();
  }, []); // Empty array means this effect runs once on mount

  const loadInitialPatterns = () => {
    getAllPatterns(1)
      .then(data => {
        setPatterns(data.patterns);
        setPage(2);
      })
      .catch(error => console.error('Error:', error));
  }

  const loadMorePatterns = () => {
    getAllPatterns(page)
      .then(data => {
        setPatterns(prevPatterns => [...prevPatterns, ...data.patterns]);
        setPage(prevPage => prevPage + 1);
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <div>
      <h1 className="item-pages">~Patterns~</h1>
      <div className="search-results">
        {patterns.map((pattern, index) => (
            <Favorites key={index} item={pattern}/>
        ))}
        <button className="load-more-button" onClick={loadMorePatterns}>Load More</button>
      </div>
    </div>
  );
}

export default Patterns;