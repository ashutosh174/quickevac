import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'WeatherWidget.css';

// Government API Endpoints
const API_ENDPOINTS = {
  WEATHER_ALERTS: 'https://api.weather.gov/alerts/active?area=ON', // National Weather Service Alerts
  EARTHQUAKES: 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2024-01-01&endtime=2025-02-09&minmagnitude=4.5&limit=5000', // USGS Earthquakes
  FEMA_DISASTERS: 'https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries', // FEMA Disasters
  CANADA_ALERTS: 'https://api.weather.gc.ca/collections/emergency-alerts/items?f=json&prov=ON' // Canada Weather Alerts
};

const EmergencyMap = () => {
  const [alerts, setAlerts] = useState([]);
  const [earthquakes, setEarthquakes] = useState([]);
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from government APIs
  useEffect(() => {
    const fetchEmergencyData = async () => {
      try {
        // 1. National Weather Service Alerts (Canada)
        const weatherResponse = await fetch(API_ENDPOINTS.CANADA_ALERTS);
        const weatherData = await weatherResponse.json();
        
        // 2. USGS Earthquakes (North America)
        const quakeResponse = await fetch(API_ENDPOINTS.EARTHQUAKES);
        const quakeData = await quakeResponse.json();
        
        // 3. FEMA Disasters (USA)
        const femaResponse = await fetch(API_ENDPOINTS.FEMA_DISASTERS);
        const femaData = await femaResponse.json();

        // Process data
        const processedAlerts = processWeatherAlerts(weatherData);
        const processedQuakes = processEarthquakeData(quakeData);
        const processedDisasters = processFemaData(femaData);

        setAlerts(processedAlerts);
        setEarthquakes(processedQuakes);
        setDisasters(processedDisasters);
        setLoading(false);

      } catch (err) {
        setError('Failed to load emergency data');
        setLoading(false);
      }
    };

    fetchEmergencyData();
    const interval = setInterval(fetchEmergencyData, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Process NWS Alert Data
  const processWeatherAlerts = (data) => {
    return data.features.map(alert => ({
      type: 'weather',
      coordinates: [alert.geometry.coordinates[1], alert.geometry.coordinates[0]],
      title: alert.properties.event,
      description: alert.properties.headline,
      severity: alert.properties.severity,
      effective: new Date(alert.properties.effective),
      expires: new Date(alert.properties.expires)
    }));
  };

  // Process USGS Earthquake Data
  const processEarthquakeData = (data) => {
    return data.features.map(quake => ({
      type: 'earthquake',
      coordinates: [quake.geometry.coordinates[1], quake.geometry.coordinates[0]],
      magnitude: quake.properties.mag,
      title: quake.properties.title,
      time: new Date(quake.properties.time)
    }));
  };

  // Process FEMA Disaster Data
  const processFemaData = (data) => {
    return data.DisasterDeclarationsSummaries.map(disaster => ({
      type: 'disaster',
      coordinates: [disaster.lat, disaster.lon],
      title: disaster.disasterName,
      declarationDate: new Date(disaster.declarationDate),
      disasterType: disaster.disasterType
    }));
  };

  // Custom Emergency Icons
  const emergencyIcons = {
    weather: L.icon({
      iconUrl: '/icons/weather-alert.png',
      iconSize: [32, 32]
    }),
    earthquake: L.icon({
      iconUrl: '/icons/earthquake.png',
      iconSize: [32, 32]
    }),
    disaster: L.icon({
      iconUrl: '/icons/disaster.png',
      iconSize: [32, 32]
    })
  };

  return (
    <div className="emergency-map">
      <MapContainer 
        center={[42.9849, -81.2453]} 
        zoom={7} 
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Weather Alerts */}
        {alerts.map((alert, index) => (
          <Marker
            key={`alert-${index}`}
            position={alert.coordinates}
            icon={emergencyIcons.weather}
          >
            <Popup>
              <div className="emergency-popup">
                <h3>⚠️ {alert.title}</h3>
                <p>{alert.description}</p>
                <p>Severity: {alert.severity}</p>
                <p>Effective: {alert.effective.toLocaleString()}</p>
                <p>Expires: {alert.expires.toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Earthquakes */}
        {earthquakes.map((quake, index) => (
          <Marker
            key={`quake-${index}`}
            position={quake.coordinates}
            icon={emergencyIcons.earthquake}
          >
            <Popup>
              <div className="emergency-popup">
                <h3>🌍 Earthquake: M{quake.magnitude}</h3>
                <p>{quake.title}</p>
                <p>Time: {quake.time.toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* FEMA Disasters */}
        {disasters.map((disaster, index) => (
          <Marker
            key={`disaster-${index}`}
            position={disaster.coordinates}
            icon={emergencyIcons.disaster}
          >
            <Popup>
              <div className="emergency-popup">
                <h3>🚨 {disaster.disasterType}</h3>
                <p>{disaster.title}</p>
                <p>Declared: {disaster.declarationDate.toLocaleDateString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {loading && <div className="loading-overlay">Loading Emergency Data...</div>}
      {error && <div className="error-overlay">{error}</div>}
    </div>
  );
};

export default EmergencyMap;