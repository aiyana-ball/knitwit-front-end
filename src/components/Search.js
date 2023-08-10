import React, { useState } from 'react';
import './SearchBar.css';
import SearchBar from './SearchBar';
import './Search.css';

function Search() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  let combinedResults = [];
  if (searchResults && searchResults.patterns && searchResults.patterns.patterns && searchResults.yarns && searchResults.yarns.yarns) {
    const patterns = searchResults.patterns.patterns;
    const yarns = searchResults.yarns.yarns;
    for (let i = 0; i < patterns.length; i++) {
      if (yarns[i]) {
        combinedResults.push({ type: 'yarn', data: yarns[i] });
      }
      if (patterns[i]) {
        combinedResults.push({ type: 'pattern', data: patterns[i] });
      }
    }
  }

  return (
    <div>
      <div className="header">
        <div id="cover">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <h1>Search Page</h1>
      <p>Welcome to the Search page! Search for anything here.</p>
      {combinedResults && (
        <div className="search-results">
          {combinedResults.map((result, index) => (
            <div key={index} className="search-result">
              {result.data.first_photo && <img src={result.data.first_photo.small_url} alt={result.data.name}/>}
              <h2>{result.data.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;


