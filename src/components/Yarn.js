import React, { useState, useEffect } from 'react';
import { getAllYarns } from './ravelry';
import './SearchResults.css';
import Favorites from './Favorites';

function YarnPage() {
  const [yarns, setYarns] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadInitialYarns();
  }, []);

    const loadInitialYarns = () => {
    getAllYarns(1)
      .then(data => {
        setYarns(data.yarns);
        setPage(2);
      })
      .catch(error => console.error('Error:', error));
  }

  const loadMoreYarns = () => {
    getAllYarns(page)
      .then(data => {
        setYarns(prevYarns => [...prevYarns, ...data.yarns]);
        setPage(prevPage => prevPage + 1);
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <div>
      <h1 className="item-pages">~Yarn~</h1>
      <div className="search-results">
        {yarns.map((yarn, index) => (
            <Favorites key={index} item={yarn}/>
        ))}
        <button className="load-more-button" onClick={loadMoreYarns}>Load More</button>
      </div>
    </div>
  );
}

export default YarnPage;