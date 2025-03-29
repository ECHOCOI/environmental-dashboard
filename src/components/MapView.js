// src/components/MapView.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = L.icon({
  iconUrl: "/shopping-mall.png", 
  iconSize: [20, 20], 
  iconAnchor: [15, 40], 
  popupAnchor: [0, -40], 
});


const customTrafficIcon = L.icon({
  iconUrl: "/traffic-light.png", 
  iconSize: [20, 20],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});


const generateHourlyTraffic = (station) => {
  const hours = Array.from({ length: 24 }, (_, i) => `hour_${String(i).padStart(2, "0")}`);
  return (
    <div>
      <strong>Hourly Traffic:</strong>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {hours.map((hour) => (
          <li key={hour}>
            <b>{hour.replace("hour_", "")}:00:</b> {station[hour] ?? "N/A"} vehicles
          </li>
        ))}
      </ul>
    </div>
  );
};

const MapView = ({ onPopupClick, onTrafficPopupClick }) => {
  const [geoJsonData, setGeoJsonData] = useState(null); // Mall data
  const [trafficData, setTrafficData] = useState([]); // Traffic data

  useEffect(() => {
    fetch('/data/mall density.geojson') 
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data))
      .catch((err) => console.error('Error loading GeoJSON data:', err));
  }, []);


  useEffect(() => {
    fetch("/data/traffic_all.json")
      .then((response) => response.json())
      .then((data) => {
        // Remove duplicates based on station_id
        const uniqueStations = Array.from(
          new Map(data.rows.map((station) => [station.station_id, station])).values()
        );
        setTrafficData(uniqueStations);
      })
      .catch((err) => console.error("Error loading traffic data:", err));
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer center={[-33.8688, 151.2093]} zoom={10} style={{ height: '100%', width: '100%' }}>
        {/* base map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Mall Marker */}
        {geoJsonData &&
          geoJsonData.features.map((feature) => {
            const { geometry, properties } = feature;
            const { coordinates } = geometry; 
            const [lon, lat] = coordinates; 

            return (
              <Marker key={feature.id} position={[lat, lon]} icon={customIcon}>
                <Popup>
                  <strong>{properties.name || 'Unnamed Mall'}</strong>
                  <br />
                  {properties.operator && <p><b>Operator:</b> {properties.operator}</p>}
                  {properties['addr:street'] && properties['addr:housenumber'] && (
                    <p><b>Address:</b> {properties['addr:housenumber']} {properties['addr:street']}</p>
                  )}
                  {properties['addr:postcode'] && <p><b>Postcode:</b> {properties['addr:postcode']}</p>}
                  {properties.opening_hours && <p><b>Opening Hours:</b> {properties.opening_hours || "Data Not Available"}</p>}
                  {<button
                      onClick={() => onPopupClick(properties.opening_hours||'')}
                      style={{
                        marginTop: "10px",
                        padding: "5px 10px",
                        backgroundColor: "#36a2eb",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Check Mall Density
                  </button>
                  }
                  {properties.website && (
                    <p>
                      <b>Website:</b>{' '}
                      <a href={properties.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </p>
                  )}
                </Popup>
              </Marker>
            );
          })}


        {/* Traffic markers */}
        {trafficData.map((station) => {
          if (station.wgs84_latitude && station.wgs84_longitude) {
            return (
              <Marker
                key={station.station_id}
                position={[station.wgs84_latitude, station.wgs84_longitude]}
                icon={customTrafficIcon}
              >
                <Popup>
                  <strong>{station.name || "Unnamed Station"}</strong>
                  <br />
                  <p><b>Road:</b> {station.road_name || "Unknown"}</p>
                  <p><b>Daily Traffic:</b> {station.daily_total || "N/A"} vehicles</p>
                  {station.intersection && <p><b>Intersection:</b> {station.intersection}</p>}
                  {generateHourlyTraffic(station)}
                  <button
                    onClick={() => onTrafficPopupClick(station)}
                    style={{
                      marginTop: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#36a2eb",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Check Traffic Density
                  </button>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}

      </MapContainer>
    </div>
  );
};

export default MapView;