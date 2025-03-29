// src/EnvironmentalDashboard.js
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Grid, Paper } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MapView from "./MapView";
import DashboardGrid from "./DashboardGrid";

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
    fontFamily: "IBM Plex Sans, sans-serif",
  },
});

const dayMapping = {
  Mo: 1,
  Tu: 2,
  We: 3,
  Th: 4,
  Fr: 5,
  Sa: 6,
  Su: 0,
};

const default_open_hours = "Mo-We 10:00-18:00; Th 10:00-21:00; Fr 10:00-23:00; Sa 10:00-18:00; Su 11:00-17:00";

// Function to check mall opening status
const isMallOpen = (rawOpeningHours) => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const timeBlocks = rawOpeningHours.split(";").map((block) => block.trim());

  for (const block of timeBlocks) {
    const [days, timeRange] = block.split(" ");
    const [startTime, endTime] = timeRange.split("-");

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    const dayRange = days.split("-");
    const startDay = dayMapping[dayRange[0]];
    const endDay = dayRange.length > 1 ? dayMapping[dayRange[1]] : startDay;

    const isInDayRange =
      (startDay <= endDay && currentDay >= startDay && currentDay <= endDay) ||
      (startDay > endDay && (currentDay >= startDay || currentDay <= endDay));

    if (isInDayRange && currentTime >= startMinutes && currentTime <= endMinutes) {
      return true;
    }
  }
  return false;
};

// Function to calculate mall density
const calculateMallDensity = (rawOpeningHours) => {
  if (isMallOpen(rawOpeningHours)) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();

    let baseDensity = 150;

    const isHoliday = [0, 6].includes(currentDay);
    if (isHoliday) {
      baseDensity *= 3;
    }

    const isWorkday = !isHoliday;
    if (isWorkday && currentHour >= 17 && currentHour <= 21) {
      baseDensity *= 1.5;
    }

    if (currentHour >= 12 && currentHour <= 14) {
      baseDensity *= 1.3;
    } else if (currentHour >= 18 && currentHour <= 20) {
      baseDensity *= 1.3;
    } else if (currentHour < 9 || currentHour > 21) {
      baseDensity /= 1.2;
    }

    const randomFactor = Math.random() * 20 - 10;
    baseDensity += randomFactor;

    return Math.floor(baseDensity);
  }

  return 0;
};

const EnvironmentalDashboard = () => {
  const [noisePollutionData, setNoisePollutionData] = useState([]);
  const [transportDensity, setTransportDensity] = useState([]);
  const [mallDensity, setMallDensity] = useState([]);
  const [congestionData, setCongestionData] = useState([]);
  const [selectedOpeningHours, setSelectedOpeningHours] = useState(default_open_hours); 
  const [selectedTrafficStation, setSelectedTrafficStation] = useState(null);

  const fetchData = () => {
    const now = new Date();
    const currentHour = now.getHours(); 
    const noiseLevel = Math.floor(Math.random() * 100);

    const currentHourKey = `hour_${currentHour.toString().padStart(2, "0")}`;

  const transportDensityValue = selectedTrafficStation
    ? Math.max(selectedTrafficStation[currentHourKey] +  Math.random() * 20 - 10, 0) || 0 // Use the station data for the current hour with + or - 10
    : Math.floor(Math.random() * 100); // Default random value if no station is selected


    const mallDensityValue = calculateMallDensity(selectedOpeningHours);
    const congestionValue = Math.floor(Math.random() * 100);

    setNoisePollutionData((prevData) => [
      ...prevData.slice(-9),
      { time: new Date().toLocaleTimeString(), value: noiseLevel },
    ]);
    setTransportDensity((prevData) => [
      ...prevData.slice(-9),
      { time: new Date().toLocaleTimeString(), value: transportDensityValue },
    ]);
    setMallDensity((prevData) => [
      ...prevData.slice(-9),
      { time: new Date().toLocaleTimeString(), value: mallDensityValue },
    ]);
    setCongestionData((prevData) => [
      ...prevData.slice(-9),
      { time: new Date().toLocaleTimeString(), value: congestionValue },
    ]);
  };

  // Fetch data every 5 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [selectedOpeningHours, selectedTrafficStation]);

  // Callback to handle popup 
  const handlePopupClick = (openingHours) => {
    setSelectedOpeningHours(openingHours || selectedOpeningHours);
  };

  const handleTrafficPopupClick = (station) => {
    setSelectedTrafficStation(station);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <div className="dashboard-container" style={{ display: "flex", height: "100vh" }}>
        <Grid container spacing={2} style={{ flex: 1 }}>
          <Grid item xs={12} md={6} style={{ height: "100%" }}>
            <Paper style={{ height: "90%", padding: "10px" }}>
            <MapView onPopupClick={handlePopupClick} onTrafficPopupClick={handleTrafficPopupClick} />
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