import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import './Search.css';
import Favorites from './Favorites';

function Search({ searchResults }) {
  const [combinedResults, setCombinedResults] = useState([]);

  useEffect(() => {
    // console.log(searchResults);
    let combinedResults = [];
    if (searchResults && searchResults.patterns && searchResults.patterns.patterns && searchResults.yarns && searchResults.yarns.yarns) {
      const patterns = searchResults.patterns.patterns;
      const yarns = searchResults.yarns.yarns;
      //console.log(patterns);
      for (let i = 0; i < Math.max(patterns.length, yarns.length); i++) {
      if (patterns[i]) {
        combinedResults.push({ type: 'pattern', data: patterns[i] });
      }
      if (yarns[i]) {
        combinedResults.push({ type: 'yarn', data: yarns[i] });
      }
    }
  } 
    setCombinedResults(combinedResults);
  }, [searchResults]);

  return (
    <div>
      {/* <h1>Search Page</h1>
      <p>Welcome to the Search page! Search for anything here.</p> */}
      {combinedResults && (
        <div className="search-results">
          {combinedResults.map((result, index) => {
            //console.log('Result data:')
            //console.log(result.data);
            return <Favorites key={index} item={result.data} type={result.type}/>
            // <div key={index} className="search-result">
            //   {result.data.first_photo && <img src={result.data.first_photo.small_url} alt={result.data.name}/>}
            //   <h2>{result.data.name}</h2>
            // </div>
          })}
        </div>
      )}
      </div>
  );
}

export default Search;


