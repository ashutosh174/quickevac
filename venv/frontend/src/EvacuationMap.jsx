import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './WeatherWidget.css';

const client_id = 'ZGdI4XabAuRWp99RwklWP';
const client_secret = 's9BPkgtBvvPLKSm41h4XG2FbPWLGbcpm6rCG9wsR';

const EARTHQUAKE_API_URL = `https://data.api.xweather.com/earthquakes/closest?p=42.9849,-81.2453&radius=500&limit=20&format=json&from=2020-01-01T00:00:00Z&to=now&client_id=${client_id}&client_secret=${client_secret}`;

const LONDON_ON = [42.9849, -81.2453];

const EmergencyMap = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarthquakeData = async () => {
      try {
        const response = await fetch(EARTHQUAKE_API_URL);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error?.description || 'Failed to fetch earthquake data');
        }

        setEarthquakes(processEarthquakeData(data.response));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEarthquakeData();
  }, []);

  const processEarthquakeData = (data) => {
    return data.map(eq => ({
      coordinates: [eq.loc.lat, eq.loc.long],
      magnitude: eq.magnitude || 'N/A',
      depth: eq.depth || 'N/A',
      location: eq.place?.name || 'Unknown Location',
      dateTime: new Date(eq.timestamp * 1000).toLocaleString(),
      severity: getSeverityLevel(eq.magnitude),
    }));
  };

  const getSeverityLevel = (magnitude) => {
    if (magnitude <= 3.0) return { color: 'blue', radius: 5 };
    if (magnitude <= 5.0) return { color: 'green', radius: 3 };
    if (magnitude <= 6.0) return { color: 'yellow', radius: 6 };
    if (magnitude <= 7.0) return { color: 'orange', radius: 7 };
    return { color: 'red', radius: 4 };
  };

  return (
    <div className="emergency-map">
      <MapContainer 
        center={LONDON_ON} 
        zoom={5}
        style={{ height: '70vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {earthquakes.map((eq, index) => (
          <CircleMarker
            key={`earthquake-${index}`}
            center={eq.coordinates}
            color={eq.severity.color}
            radius={eq.severity.radius}
            fillOpacity={0.6}
          >
            <Popup>
              <div className="earthquake-popup">
                <h3>🌍 Earthquake</h3>
                <p><strong>Location:</strong> {eq.location}</p>
                <p><strong>Magnitude:</strong> {eq.magnitude}</p>
                <p><strong>Depth:</strong> {eq.depth} km</p>
                <p><strong>Date:</strong> {eq.dateTime}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {loading && <div className="loading-overlay">Loading Earthquake Data...</div>}
      {error && <div className="error-overlay">{error}</div>}
    </div>
  );
};

export default EmergencyMap;
