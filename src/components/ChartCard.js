// src/components/ChartCard.js
import React from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const ChartCard = ({ title, data, chartType, options }) => {
  const generateChartData = (data, label, color) => ({
    labels: data.map(item => item.time),
    datasets: [{
      label,
      data: data.map(item => item.value),
      borderColor: color,
      backgroundColor: color,
      fill: true,
    }]
  });

  return (
    <Card style={{ width: '100%', textAlign: 'center', padding: '10px', height: '100%' }}>
      <CardContent style={{ height: '100%' }}>
        <Typography variant="h5" style={{ marginBottom: '10px' }}>{title}</Typography>
        {data.length > 0 ? (
          chartType === 'line' ? (
            <Line data={generateChartData(data, title, "#ff6384")} options={options} />
          ) : (
            <Bar data={generateChartData(data, title, "#36a2eb")} options={options} />
          )
        ) : (
          <CircularProgress />
        )}
      </CardContent>
    </Card>
  );
};

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  chartType: PropTypes.oneOf(['line', 'bar']).isRequired,
  options: PropTypes.object, // Added options prop
};

export default ChartCard;