import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { adminApi } from '../../api/adminApi';
import DonutChart from './DonutChart';

// const data = [
//   { name: 'mon', customers: 4000, sales: 2400, amt: 2400 },
//   { name: 'tue', customers: 3000, sales: 1398, amt: 2210 },
//   { name: 'wed', customers: 2000, sales: 9800, amt: 2290 },
//   { name: 'thu', customers: 2780, sales: 3908, amt: 2000 },
//   { name: 'fri', customers: 1890, sales: 4800, amt: 2181 },
//   { name: 'sat', customers: 2390, sales: 3800, amt: 2500 },
//   { name: 'sun', customers: 3490, sales: 4300, amt: 2100 },
// ];

const LineChartComponent = () => {
  const [data, setData] = useState();

  useEffect(() => {
    adminApi
      .get('/fetch-graph-data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
   
      });
  }, []);

  return (
    <div className='chart-container flex justify-between p-'>
      {/* <div className='sales-chart mb-10'>
        <h3 className='font-semibold m-5'>Sales Chart</h3>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='day' />
          <YAxis domain={[0, 50000]} />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='sales' stroke='#8884d8' />
        </LineChart>
      </div> */}
      <div className='sales-chart mb-10'>
        <h3 className='font-semibold mx-2'>Sales Chart</h3>
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
