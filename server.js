const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

// Load index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// SHOWTIMES MOVIE DATABASE:
// const apikey = '0OYgfApT4m4icnGPLkvla2abLCtN02mN3qObWwAy';
// const baseURL = 'https://api-gate2.movieglu.com/';
// const filmsNowShowingRoute = 'filmsNowShowing/?n=10';
// const cinemasNearbyRoute = 'cinemasNearby/?n=5';
// const zipCode = '78701';
// const d = new Date();
// const today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

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

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// app.get('/films', (req, res) => {
//   request({ url: baseURL + filmsNowShowingRoute }, (error, response, body) => {
//     if (error || response.statusCode !== 200) {
//       return res.status(500).json({ type: 'error', message: err.message });
//     }

//     res.json(JSON.parse(body));
//   });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
