const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Miro Müller',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Miro Müller',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Thats my helper page',
    title: 'Help',
    name: 'Miro Müller',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a city',
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(data.long, data.lat, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        Ort: data.location,
        Wetter: forecastData,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    error: 'Help article not found',
    name: 'Miro Müller',
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    error: 'Page not found',
    name: 'Miro Müller',
  });
});

app.listen(3000, () => {
  console.log('Server ready!');
});
