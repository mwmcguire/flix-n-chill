// Require dependencies
const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // window.fetch for node.js
const convert = require('xml-js'); // convert xml to json
const rateLimit = require('express-rate-limit'); // limit repeated requests to APIs
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

// apply Access-Control-Allow-Origin: * header to every response
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// api route
app.get('/api/cinemas', async (req, res) => {
  const settings = {
    method: 'GET',
    timeout: 0,
    headers: {
      client: 'MWMC',
      'x-api-key': apikey,
      authorization: 'Basic TVdNQ19YWDphZWJtZFA3dDNRemw=',
      territory: 'XX',
      'api-version': 'v200',
      geolocation: '-22.0;14.0',
      'device-datetime': '2020-06-18T12:07:57.296Z',
    },
  };

  try {
    const response = await fetch(
      'https://api-gate2.movieglu.com/cinemasNearby/?n=5',
      settings
    );
    const data = await response.json();

    console.log(data);

    return res.json({
      success: true,
      data,
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
