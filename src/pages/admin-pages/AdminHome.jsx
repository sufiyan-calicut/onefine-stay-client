import React, { useEffect, useState } from 'react';

import Layout from '../../components/admin-components/Layout';
import LineChartComponent from './LineChartComponent';
import { adminApi } from '../../api/adminApi.js';
import DonutChart from './DonutChart';

function AdminHome() {
  const [count, setCount] = useState({
    totalBookings: 0,
    totalUsers: 0,
    weekSale: 0,
    monthSale: 0,
  });
  useEffect(() => {
    adminApi
      .get('/fetch-data-counts')
      .then((response) => {
        setCount(response.data);
      })
      .catch((error) => {

      });
  }, []);

  return (
    <Layout>
      <div className='flex flex-col '>
        <div className='p-10 flex justify-around w-full gap-3'>
          <div className='border px-10 py-3 h-20 w-60 bg-gradient-to-br from-emerald-900  to-teal-500 '>
            <h1 className='tracking-wider font-bold text-gray-50'>Total Bookings</h1>
            <h4 className='text-gray-100'>{count?.totalBookings}</h4>
          </div>
          <div className='border px-10 py-3 h-20 w-60 bg-gradient-to-br from-emerald-900  to-teal-500'>
            <h1 className='tracking-wider font-bold text-gray-50'>Total Costomers</h1>
            <h4 className='text-gray-100'>{count?.totalUsers}</h4>
          </div>
          <div className='border px-10 py-3 h-20 w-60 bg-gradient-to-br from-emerald-900  to-teal-500'>
            <h1 className='tracking-wider font-bold text-gray-50'>sales of the month</h1>
            <h4 className='text-gray-100'>{count?.monthSale}</h4>
          </div>
          <div className='border px-10 py-3 h-20 w-60 bg-gradient-to-br from-emerald-900  to-teal-500'>
            <h1 className='tracking-wider font-bold text-gray-50'>sales of the week</h1>
            <h4 className='text-gray-100'>{count?.weekSale}</h4>
          </div>
        </div>

        <div className='my-10'>
          <LineChartComponent />
          
        </div>
      </div>
    </Layout>
  );
}

export default AdminHome;
