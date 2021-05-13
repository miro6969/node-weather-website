const request = require('postman-request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    address +
    '.json?access_token=pk.eyJ1IjoibWlybXVlbCIsImEiOiJja25raHc4d3QwOHJ3MnVwZTNldmI4aDRpIn0.iw1ZNtJ6xqGS5FiRKdyunA&limit=1&language=de';

  request({ url, json: true }, (error, response) => {
    //destruct url: url
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (
      response.body.features === undefined ||
      response.body.features[0] === undefined
    ) {
      callback('Sorry, no matches found', undefined);
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[1],
        long: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
