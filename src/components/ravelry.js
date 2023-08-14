export function makeRavelryRequest(endpoint) {
  const headers = {
    'Authorization': 'Basic ' + btoa(`${process.env.REACT_APP_RAVELRY_API_USER}:${process.env.REACT_APP_RAVELRY_API_PASS}`),
  };

  return fetch(`https://api.ravelry.com/${endpoint}`, { headers })
    .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
    })
    .then(data => {
      return data;
    });
  }

  export function getAllPatterns() {
    return makeRavelryRequest(`patterns/search.json?&page_size=50`)
      .then(data => {
        data.patterns.forEach(pattern => {
          pattern.type = 'pattern';
        });
        return data;
      })
      .catch(error => console.error('Error:', error));
  }
  
  export function getAllYarns() {
    return makeRavelryRequest(`yarns/search.json?&page_size=50`)
      .then(data => {
        data.yarns.forEach(yarn => {
          yarn.type = 'yarn';
        });
        return data;
      })
      .catch(error => console.error('Error:', error));
  };