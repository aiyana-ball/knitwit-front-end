import React, { useState } from 'react';
import { makeRavelryRequest } from './ravelry';
import { useNavigate } from 'react-router-dom';
import './SearchResults.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('searching yarns and patterns')
    Promise.all([
      makeRavelryRequest(`yarns/search.json?query=${query}&page_size=200`),
      makeRavelryRequest(`patterns/search.json?query=${query}&page_size=200`)
    ])
    .then(([yarnsData, patternsData]) => {
      const data = {
        yarns: yarnsData,
        patterns: patternsData
      };
      console.log(data);
      onSearch(data);
      navigate('/search');
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <form method="get" action="" onSubmit={handleSubmit}>
      <div className="tb">
        <div className="td">
          <input type="text" placeholder="Search for anything here..." required value={query} onChange={handleInputChange} />
        </div>
        <div className="td" id="s-cover">
          <button type="submit">
            <div id="s-circle"></div>
            <span></span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;