const url = 'https://api.foursquare.com'
const CLIENT_ID = 'CX5YHC2KT4US3CNEUCVJRLQ1Z4TNTKP2IYKCPJFNNHWW3EWH'
const CLIENT_SECRET = 'OQU5CNIMZAEM51Y5KNQIPH0T0IPNA4XBDWG200ZFBODOUDAZ'
const VERSION = '20181105'

// Fetches data from FourSquare

export const getRestaurant = (id) =>
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
