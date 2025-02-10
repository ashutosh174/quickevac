import React, { useState, useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Coordinates for London, Ontario, Canada
  const LAT = 42.9849;
  const LON = -81.2453;
  const API_KEY = '063dc1819d3d9955593da35702906396';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;

  const fetchWeather = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
        setError('');
      } else {
        setError(data.message || 'Failed to fetch weather');
      }
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="card-event">
      <Card.Body>
        <div className="row align-items-center justify-content-center">
          <div className="col">
            <h5 className="m-0">Current Weather</h5>
          </div>
          <div className="col-auto">
            {weather?.weather?.[0]?.icon && (
              <img 
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                style={{ width: '40px' }}
              />
            )}
          </div>
        </div>

        {loading && <Spinner animation="border" size="sm" className="mt-2" />}

        {error && <div className="text-danger mt-2">{error}</div>}

        {weather && !loading && !error && (
          <div className="mt-3">
            <h2 className="f-w-300">
              {Math.round(weather.main.temp)}°C
              <sub className="text-muted f-14">
                {weather.weather[0].description}
              </sub>
            </h2>
            <div className="row text-muted mt-2">
              <div className="col-6">
                <i className="feather icon-droplet text-c-blue" /> Humidity: {weather.main.humidity}%
              </div>
              <div className="col-6">
                <i className="feather icon-wind text-c-green" /> Wind: {weather.wind.speed} m/s
              </div>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default WeatherWidget;