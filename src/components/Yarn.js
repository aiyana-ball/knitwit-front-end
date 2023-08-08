import React, { useState, useEffect } from 'react';
import { getAllYarns } from './ravelry';
import './SearchResults.css';

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
          <div key={index} className="search-result">
            <img src={yarn.first_photo.small_url} alt={yarn.name} />
            <h2>{yarn.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YarnPage;