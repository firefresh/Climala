/* eslint-env node */
/*
 * @license
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
'use strict';

const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

// : Change this to add a delay (ms) before the server responds.
const FORECAST_DELAY = 1000;

// : If running locally, set the API_KEY for OpenWeatherMap
const API_KEY = process.env.OWM_API_KEY;
const BASE_URL = `https://api.openweathermap.org/data/2.5/onecall?`;

// URL for example : https://api.openweathermap.org/data/2.5/onecall?lat=-35.024854&lon=-58.424114&appid=

// Fake forecast data used if we can't reach the Open Weather Map API
const fakeForecast = {
  "lat": -35.02,
  "lon": -58.42,
  "timezone": "America/Argentina/Buenos_Aires",
  "timezone_offset": -10800,
  "current": {
    "dt": 1598830806,
    "sunrise": 1598782506,
    "sunset": 1598823220,
    "temp": 10.38,
    "feels_like": 7.94,
    "pressure": 1024,
    "humidity": 63,
    "dew_point": 3.65,
    "uvi": 5.01,
    "clouds": 34,
    "visibility": 10000,
    "wind_speed": 1.5,
    "wind_deg": 350,
    "weather": [
      {
        "id": 802,
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03n"
      }
    ]
  },
  "daily": [
    {
      "dt": 1598799600,
      "sunrise": 1598782506,
      "sunset": 1598823220,
      "temp": {
        "day": 10.38,
        "min": 6.67,
        "max": 10.38,
        "night": 6.67,
        "eve": 10.38,
        "morn": 10.38
      },
      "feels_like": {
        "day": 7.46,
        "night": 2.95,
        "eve": 7.46,
        "morn": 7.46
      },
      "pressure": 1024,
      "humidity": 63,
      "dew_point": 3.65,
      "wind_speed": 2.19,
      "wind_deg": 282,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "clouds": 34,
      "pop": 0,
      "uvi": 5.01
    },
    {
      "dt": 1598886000,
      "sunrise": 1598868826,
      "sunset": 1598909663,
      "temp": {
        "day": 11.85,
        "min": 3.99,
        "max": 13.3,
        "night": 4.36,
        "eve": 10.2,
        "morn": 3.99
      },
      "feels_like": {
        "day": 8.11,
        "night": -0.65,
        "eve": 6.31,
        "morn": 0.37
      },
      "pressure": 1031,
      "humidity": 63,
      "dew_point": 5.05,
      "wind_speed": 3.74,
      "wind_deg": 134,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 100,
      "pop": 0,
      "uvi": 5
    },
    {
      "dt": 1598972400,
      "sunrise": 1598955144,
      "sunset": 1598996106,
      "temp": {
        "day": 10.08,
        "min": 2.74,
        "max": 10.24,
        "night": 7.31,
        "eve": 8.26,
        "morn": 2.74
      },
      "feels_like": {
        "day": 4.47,
        "night": 2.52,
        "eve": 3.54,
        "morn": -1.8
      },
      "pressure": 1036,
      "humidity": 67,
      "dew_point": 4.36,
      "wind_speed": 6.19,
      "wind_deg": 94,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": 98,
      "pop": 0.7,
      "rain": 1.15,
      "uvi": 4.9
    },
    {
      "dt": 1599058800,
      "sunrise": 1599041462,
      "sunset": 1599082549,
      "temp": {
        "day": 8.59,
        "min": 7.34,
        "max": 9.13,
        "night": 8.24,
        "eve": 8.92,
        "morn": 7.34
      },
      "feels_like": {
        "day": 4.05,
        "night": 4.73,
        "eve": 4.28,
        "morn": 1.95
      },
      "pressure": 1022,
      "humidity": 95,
      "dew_point": 7.93,
      "wind_speed": 5.76,
      "wind_deg": 138,
      "weather": [
        {
          "id": 502,
          "main": "Rain",
          "description": "heavy intensity rain",
          "icon": "10d"
        }
      ],
      "clouds": 100,
      "pop": 1,
      "rain": 19.76,
      "uvi": 4.69
    },
    {
      "dt": 1599145200,
      "sunrise": 1599127780,
      "sunset": 1599168992,
      "temp": {
        "day": 9.65,
        "min": 6.38,
        "max": 11.27,
        "night": 6.38,
        "eve": 10.46,
        "morn": 7.75
      },
      "feels_like": {
        "day": 6.93,
        "night": 3.5,
        "eve": 8.61,
        "morn": 5.11
      },
      "pressure": 1016,
      "humidity": 84,
      "dew_point": 7.17,
      "wind_speed": 2.92,
      "wind_deg": 277,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 100,
      "pop": 0,
      "uvi": 4.37
    },
    {
      "dt": 1599231600,
      "sunrise": 1599214096,
      "sunset": 1599255435,
      "temp": {
        "day": 14.81,
        "min": 4.81,
        "max": 16.24,
        "night": 7.29,
        "eve": 12.89,
        "morn": 4.81
      },
      "feels_like": {
        "day": 11.53,
        "night": 3.99,
        "eve": 10.02,
        "morn": 1.32
      },
      "pressure": 1018,
      "humidity": 70,
      "dew_point": 9.55,
      "wind_speed": 4.52,
      "wind_deg": 255,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "clouds": 12,
      "pop": 0,
      "uvi": 4.23
    },
    {
      "dt": 1599318000,
      "sunrise": 1599300413,
      "sunset": 1599341878,
      "temp": {
        "day": 13.56,
        "min": 5.02,
        "max": 14.36,
        "night": 6.29,
        "eve": 11.4,
        "morn": 5.02
      },
      "feels_like": {
        "day": 9.23,
        "night": 1.73,
        "eve": 8.12,
        "morn": 1.36
      },
      "pressure": 1026,
      "humidity": 49,
      "dew_point": 3.15,
      "wind_speed": 4.06,
      "wind_deg": 118,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": 0,
      "pop": 0,
      "uvi": 4.25
    },
    {
      "dt": 1599404400,
      "sunrise": 1599386729,
      "sunset": 1599428320,
      "temp": {
        "day": 11.12,
        "min": 4.64,
        "max": 11.87,
        "night": 5.75,
        "eve": 9.26,
        "morn": 4.64
      },
      "feels_like": {
        "day": 6.23,
        "night": 2.56,
        "eve": 4.81,
        "morn": 0.36
      },
      "pressure": 1030,
      "humidity": 67,
      "dew_point": 5.39,
      "wind_speed": 5.45,
      "wind_deg": 119,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 86,
      "pop": 0,
      "uvi": 4.26
    }
  ]
};

/**
 * Generates a fake forecast in case the weather API is not available.
 *
 * @param {String} location GPS location to use.
 * @return {Object} forecast object.
 */
function generateFakeForecast(location) {
  location = location || '-35.024854,-58.424114';
  const commaAt = location.indexOf(',');

  // Create a new copy of the forecast
  const result = Object.assign({}, fakeForecast);
  result.latitude = parseFloat(location.substr(0, commaAt));
  result.longitude = parseFloat(location.substr(commaAt + 1));
  return result;
}


/**
 * Gets the weather forecast from the Open Weather Map API for the given location.
 *
 * @param {Request} req request object from Express.
 * @param {Response} resp response object from Express.
 * 
 */
function getForecast(req, resp) {
  const location = req.params.location.split(',') || ['-35.024854', '-58.424114'];
  //const url = `${BASE_URL}lat=${location[0]}&lon=${location[1]}&appid=${API_KEY}`;
  const url = `${BASE_URL}lat=${location[0]}&lon=${location[1]}&units=metric&exclude=minutely,hourly&appid=${API_KEY}`;
  console.log(url)
  fetch(url).then((resp) => {
    if (resp.status !== 200) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  }).then((data) => {
    setTimeout(() => {
      resp.json(data);
    }, FORECAST_DELAY);
  }).catch((err) => {
    console.error('OpenWeatherMap API Error:', err.message);
    resp.json(generateFakeForecast(location));
  });
}

/**
 * Starts the Express server.
 *
 * @return {ExpressServer} instance of the Express server.
 */
function startServer() {
  const app = express();

  // Redirect HTTP to HTTPS,
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

  // Logging for each request
  app.use((req, resp, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const path = `"${req.method} ${req.path}"`;
    const m = `${req.ip} - ${time} - ${path}`;
    // eslint-disable-next-line no-console
    console.log(m);
    next();
  });

  // Handle requests for the data
  app.get('/forecast/:location', getForecast);
  app.get('/forecast/', getForecast);
  app.get('/forecast', getForecast);

  // Handle requests for static files
  app.use(express.static('public'));

  // Start the server
  return app.listen('8000', () => {
    // eslint-disable-next-line no-console
    console.log('Local DevServer Started on port 8000...');
  });
}

startServer();
