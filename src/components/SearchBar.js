import React, { useState } from 'react';
import { makeRavelryRequest } from '../ravelry'; // import your API request function

function SearchBar() {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('searching yarns')
    makeRavelryRequest(`yarns/search.json?query=${query}`)
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <form method="get" action="" onSubmit={handleSubmit}>
      <div className="tb">
        <div className="td">
          <input type="text" placeholder="Search" required value={query} onChange={handleInputChange} />
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