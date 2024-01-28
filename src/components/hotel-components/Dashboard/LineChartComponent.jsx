import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { hotelApi } from '../../../api/hotelApi';
import DonutChart from './DonutChart';



const LineChartComponent = () => {
  const [data, setData] = useState();

  useEffect(() => {
    hotelApi
      .get('/fetch-graph-data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
      });
  }, []);

  return (
    <div className='chart-container flex justify-between p-'>
      <div className='sales-chart mb-10'>
        <h3 className='font-semibold m-5'>Sales Chart</h3>
        {/* <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='day' />
          <YAxis domain={[0, 50000]} />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='sales' stroke='#8884d8' />
        </LineChart> */}
        <DonutChart value={data}/>
      </div>
      <div className='bookings-customers-chart'>
        <h3 className='font-semibold m-5'>Bookings and Customers Chart</h3>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='day' />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='customers' stroke='#82ca9d' />
          <Line type='monotone' dataKey='bookings' stroke='#f0596f' />
        </LineChart>
      </div>
    </div>
  );
};

export default LineChartComponent;
