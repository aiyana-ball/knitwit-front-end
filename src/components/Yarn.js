import React, { useState, useEffect } from 'react';
import { getAllYarns } from './ravelry';

function YarnPage() {
  const [yarns, setYarns] = useState([]);

  useEffect(() => {
    getAllYarns('yarns/search.json')
      .then(data => setYarns(data.yarns))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="yarns">
      {yarns.map((yarn, index) => (
        <div key={index} className="yarn">
          <img src={yarn.image_url} alt={yarn.name} />
          <h2>{yarn.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default YarnPage;