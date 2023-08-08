import React from 'react';
import './SearchBar.css';
import SearchBar from './SearchBar';
import './Search.css';

function Search() {
  return (
    <div>
      <div className="header">
        <div id="cover">
              <SearchBar />
              </div>
          </div>
      <h1>Search Page</h1>
      <p>Welcome to the Search page!. Search for anything here.</p>
    </div>
  );
}

export default Search;

