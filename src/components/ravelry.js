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
    });
  }

    
export function getAllPatterns() {
  console.log('Getting all patterns')
  const data = makeRavelryRequest(`patterns/search.json?&page_size=200`)
  console.log(data)
  return data
    .catch(error => console.error('Error:', error));
  };

export function getAllYarns() {
  console.log('Getting all yarns')
  const data = makeRavelryRequest(`yarns/search.json?&page_size=200`)
  console.log(data)
  return data
    .catch(error => console.log.error('Error:', error));
};