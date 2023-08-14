import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import './Search.css';
import Favorites from './Favorites';

function Search({ searchResults }) {
  const [combinedResults, setCombinedResults] = useState([]);

  useEffect(() => {
    let combinedResults = [];
    if (searchResults && searchResults.patterns && searchResults.patterns.patterns && searchResults.yarns && searchResults.yarns.yarns) {
      const patterns = searchResults.patterns.patterns;
      const yarns = searchResults.yarns.yarns;
      for (let i = 0; i < Math.max(patterns.length, yarns.length); i++) {
      if (patterns[i]) {
        patterns[i].type = 'pattern';
        combinedResults.push({ type: 'pattern', data: patterns[i] });
      }
      if (yarns[i]) {
        yarns[i].type = 'yarn';
        combinedResults.push({ type: 'yarn', data: yarns[i] });
      }
    }
  } 
    setCombinedResults(combinedResults);
  }, [searchResults]);

  return (
    <div>
      {combinedResults && (
        <div className="search-results">
          {combinedResults.map((result, index) => {
            return <Favorites key={index} item={result.data} type={result.type}/>
          })}
        </div>
      )}
      </div>
  );
}

export default Search;


