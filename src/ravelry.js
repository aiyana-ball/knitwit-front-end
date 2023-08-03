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
