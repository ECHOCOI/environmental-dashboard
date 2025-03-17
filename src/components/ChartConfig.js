const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: true, // Ensure the aspect ratio is maintained
  aspectRatio: 1, // Forces a square aspect ratio (1:1)
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
    filler: {
      propagate: true,
    },
  },
};

export const chartOptions = {
  noisePollution: { ...baseChartOptions },
  transportDensity: { ...baseChartOptions },
  mallDensity: { ...baseChartOptions },
  congestionData: { ...baseChartOptions },
};
