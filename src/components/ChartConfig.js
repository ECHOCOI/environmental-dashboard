// src/components/ChartConfig.js
export const chartOptions = {
    noisePollution: {
      responsive: true,
      maintainAspectRatio: false, // Allow the chart to fill the container
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5,
          },
          grid: {
            display: true, // Show grid lines for better readability
          },
        },
        y: {
          ticks: {
            stepSize: 10,
          },
          grid: {
            display: true, // Show grid lines for better readability
          },
        },
      },
      plugins: {
        legend: {
          display: true, // Show legend
          position: 'top', // Position of the legend
        },
        tooltip: {
          enabled: true, // Enable tooltips
        },
      },
    },
    transportDensity: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5,
          },
          grid: {
            display: true,
          },
        },
        y: {
          ticks: {
            stepSize: 10,
          },
          grid: {
            display: true,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          enabled: true,
        },
      },
    },
    mallDensity: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5,
          },
          grid: {
            display: true,
          },
        },
        y: {
          ticks: {
            stepSize: 10,
          },
          grid: {
            display: true,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          enabled: true,
        },
      },
    },
    congestionData: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5,
          },
          grid: {
            display: true,
          },
        },
        y: {
          ticks: {
            stepSize: 10,
          },
          grid: {
            display: true,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  };