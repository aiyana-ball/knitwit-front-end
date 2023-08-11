import React, { useState, useEffect } from 'react';
import { getAllYarns } from './ravelry';
import './SearchResults.css';
import Favorites from './Favorites';

function YarnPage() {
  const [yarns, setYarns] = useState([]);

  useEffect(() => {
    getAllYarns('yarns/search.json')
      .then(data => setYarns(data.yarns))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Yarn Page</h1>
      <p>Welcome to the yarn page!</p>
      <div className="search-results">
        {yarns.map((yarn, index) => (
            <Favorites key={index} item={yarn}/>
        ))}
      </div>
    </div>
  );
}

export default YarnPage;