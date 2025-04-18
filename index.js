addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // https://api.weather.gov/points/38.8894,-77.0352
  const { latitude, longitude } = request.cf;
  const headers = {
    'content-type': 'application/json',
    'User-Agent': ('landro.dev', 'jaylandro@hotmail.com')
  }

  const weatherLocationResponse = await fetch(
    `https://api.weather.gov/points/${latitude},${longitude}`, { headers: headers }
  );
  const weatherLocationData = await weatherLocationResponse.json();

  const forecastResponse = await fetch(
    weatherLocationData.properties.forecast, { headers: headers }
  );

  const forecastData = await forecastResponse.json();
  const forecast = forecastData.properties.periods;

  function iconHelper(shortForecastString) {
    if (shortForecastString.includes("Snow"))
      return '🌨';

    if (shortForecastString.includes("thunderstorms"))
      return '⛈';

    if (shortForecastString.includes("Partly Cloudy"))
      return '🌤';

    if (shortForecastString.includes("Cloud"))
      return '☁️';

    if (shortForecastString.includes("Light Rain"))
      return '🌦';

    if (shortForecastString.includes("Rain"))
      return '🌧';

    return '☀️';
  }

  let html = `
    <html>
    <head>
      <title>Geolocation: Weather</title>
    </head>
    
    <body>
      <style>
        body {
          padding: 6em; 
          font-family: sans-serif;
        }
        
        h1 {
          color: #f6821f;
        }

        .header {
          grid-area: header;
          margin-bottom: 0;
        }

        .icon {
          grid-area: icon;
          font-size: 3em;
          font-style: normal;
        }

        .detailforecast {
          grid-area: detailforecast;
          line-height: 1.4;
          max-width: 500px;
        }

        .day {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: 3.2em 3fr;
          grid-template-areas:
          "header header"
          "icon detailforecast";
          margin-bottom: 1.2em;
        }
      </style>

      <div id="container">
        <h1>Weather in ${weatherLocationData.properties.relativeLocation.properties.city}, ${weatherLocationData.properties.relativeLocation.properties.state}</h1>
        
        <main>
          <section>
              ${forecast.map(day => `
                <div class="day">
                  <h3 class="header">${day.name}</h3> 
                  <i class="icon">${iconHelper(day.shortForecast)}</i>
                  <span class="detailforecast">${day.detailedForecast}</span> 
                </div>
              `).join(' ')}
          </section>
      </div>
    </body>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=UTF-8;',
    },
  });
}