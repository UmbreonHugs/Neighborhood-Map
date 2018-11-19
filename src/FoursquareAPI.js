const url = 'https://api.foursquare.com'
const CLIENT_ID = '' // client ID here
const CLIENT_SECRET = '' // client secret here
const VERSION = '' // today's date

// Fetches data from FourSquare
export const getRestaurant = (id) =>
// see https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
    fetch(`${url}/v2/venues/${id}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(function(response) {
      return response.json();
    }).catch(function(error) {
      console.log(error);
    })
