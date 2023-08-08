import React, { useState, useEffect } from 'react';
import { getAllPatterns } from './ravelry';

function Patterns() {
  const [patternData, setPatternData] = useState(null);

  useEffect(() => {
    getAllPatterns()
      .then(data => setPatternData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  if (!patternData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Patterns Page</h1>
      <p>Welcome to the patterns page!</p>
      <div className="grid">
        {Object.entries(patternData.patterns).map(([key, pattern]) => (
          <div key={pattern.id} className="grid-item">
            <h2>{pattern.name}</h2>
            <img src={pattern.image_url} alt={pattern.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Patterns;