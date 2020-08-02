// Require dependencies
const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // window.fetch for node.js
const convert = require('xml-js'); // convert xml to json
const rateLimit = require('express-rate-limit'); // limit repeated requests to APIs
const { json } = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public')); // serve static files

// Apply rate-limits to all requests
// const limiter = rateLimit({
//   windowMS: 1000,
//   max: 1,
// });

// app.use(limiter);

// Load index page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// SHOWTIMES MOVIE DATABASE:
const apikey = process.env.API_KEY;
const baseURL = 'https://api-gate2.movieglu.com/';
const filmsNowShowingRoute = 'filmsNowShowing/?n=10';
const cinemasNearbyRoute = 'cinemasNearby/?n=5';

// const settings = {
//   url: 'https://cors-anywhere.herokuapp.com/' + baseURL + filmsNowShowingRoute,
//   method: 'GET',
//   timeout: 0,
//   headers: {
//     client: 'MWMC',
//     'x-api-key': apikey,
//     authorization: 'Basic TVdNQzo2R3hJd2V4WnZXeng=',
//     territory: 'US',
//     'api-version': 'v200',
//     geolocation: '-34.397;150.644',
//     'device-datetime': '2020-06-18T12:07:57.296Z',
//   },
// };

// apply Access-Control-Allow-Origin: * header to every response
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// api route
app.get('/api/films', async (req, res) => {
  try {
    req.header({
      client: 'MWMC',
      'x-api-key': apikey,
      authorization: 'Basic TVdNQzo2R3hJd2V4WnZXeng=',
      territory: 'US',
      'api-version': 'v200',
      geolocation: '-34.397;150.644',
      'device-datetime': '2020-06-18T12:07:57.296Z',
    });

    const apiResponse = await fetch(
      'https://api-gate2.movieglu.com/filmsNowShowing/?n=10'
    );
    const apiData = await apiResponse.json();

    return res.json({
      success: true,
      apiData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
