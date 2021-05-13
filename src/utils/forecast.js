const request = require('request');

const forecast = (lat, long, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=98cbb247be2cc54c66962aa9dca5467c&query=' +
    long +
    ',' +
    lat +
    '&units=m';
  request({ url, json: true }, (error, response) => {
    //destruct url: url
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (response.body.error) {
      callback(response.body.error, undefined);
    } else {
      callback(
        undefined,
        `${response.body.current.weather_descriptions[0]}, It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
