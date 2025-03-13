// src/EnvironmentalDashboard.js
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Grid, Paper } from "@mui/material";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MapView from './MapView';
import DashboardGrid from './DashboardGrid';

// Register the necessary components for Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5",
    },
    text: {
      primary: "#333",
    },
  },
  typography: {
    fontFamily: 'IBM Plex Sans, sans-serif',
  },
});

const EnvironmentalDashboard = () => {
  const [noisePollutionData, setNoisePollutionData] = useState([]);
  const [transportDensity, setTransportDensity] = useState([]);
  const [mallDensity, setMallDensity] = useState([]);
  const [congestionData, setCongestionData] = useState([]);

  const fetchData = () => {
    // Simulated data fetching
    const noiseLevel = Math.floor(Math.random() * 100);
    const transportDensityValue = Math.floor(Math.random() * 100);
    const mallDensityValue = Math.floor(Math.random() * 100);
    const congestionValue = Math.floor(Math.random() * 100);

    setNoisePollutionData(prevData => [...prevData.slice(-9), { time: new Date().toLocaleTimeString(), value: noiseLevel }]);
    setTransportDensity(prevData => [...prevData.slice(-9), { time: new Date().toLocaleTimeString(), value: transportDensityValue }]);
    setMallDensity(prevData => [...prevData.slice(-9), { time: new Date().toLocaleTimeString(), value: mallDensityValue }]);
    setCongestionData(prevData => [...prevData.slice(-9), { time: new Date().toLocaleTimeString(), value: congestionValue }]);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <div className="dashboard-container" style={{ display: 'flex', height: '100vh' }}>
        <Grid container spacing={2} style={{ flex: 1 }}>
          <Grid item xs={12} md={6} style={{ height: '100%' }}>
            <Paper style={{ height: '90%', padding: '10px' }}>
              <MapView />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <DashboardGrid 
              noisePollutionData={noisePollutionData} 
              transportDensity={transportDensity} 
              mallDensity={mallDensity} 
              congestionData={congestionData} 
            />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default EnvironmentalDashboard;