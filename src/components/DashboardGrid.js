// src/components/DashboardGrid.js
import React from 'react';
import { Grid } from '@mui/material';
import ChartCard from './ChartCard';
import { chartOptions } from './ChartConfig';

const DashboardGrid = ({ noisePollutionData, transportDensity, mallDensity, congestionData }) => {
  return (
    <Grid container spacing={2} style={{ height: '100%' }}>
      <Grid item xs={12} md={6} style={{ height: '50%' }}>
        <ChartCard title="Noise Pollution Levels" data={noisePollutionData} chartType="line" options={chartOptions.noisePollution} />
      </Grid>
      <Grid item xs={12} md={6} style={{ height: '50%' }}>
        <ChartCard title="Transport Density" data={transportDensity} chartType="bar" options={chartOptions.transportDensity} />
      </Grid>
      <Grid item xs={12} md={6} style={{ height: '50%' }}>
        <ChartCard title="Mall Density" data={mallDensity} chartType="bar" options={chartOptions.mallDensity} />
      </Grid>
      <Grid item xs={12} md={6} style={{ height: '50%' }}>
        <ChartCard title="Congestion Data" data={congestionData} chartType="line" options={chartOptions.congestionData} />
      </Grid>
    </Grid>
  );
};

export default DashboardGrid;