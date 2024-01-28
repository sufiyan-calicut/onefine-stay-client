import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CandlestickChart = () => {
  const chartRef = useRef();

  const data = [
    {
      t: '2022-01-01',
      o: 20,
      h: 30,
      l: 10,
      c: 15
    },
    {
      t: '2022-01-02',
      o: 15,
      h: 25,
      l: 10,
      c: 20
    },
    {
      t: '2022-01-03',
      o: 20,
      h: 25,
      l: 10,
      c: 10
    },
    {
      t: '2022-01-04',
      o: 10,
      h: 20,
      l: 5,
      c: 15
    },
    {
      t: '2022-01-05',
      o: 15,
      h: 25,
      l: 10,
      c: 20
    },
  ];

  useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: 'candlestick',
      data: {
        datasets: [
          {
            label: '',
            data: data.map(({ t, o, h, l, c }) => ({
              t,
              o,
              h,
              l,
              c,
            })),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'MMM D',
                },
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                callback: (value) => `$${value}`,
              },
            },
          ],
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default CandlestickChart;
