import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import LineChartComponent from './Dashboard/LineChartComponent';
import { hotelApi } from '../../api/hotelApi';
import { useNavigate } from 'react-router-dom';

function HotelDashboard(props) {
  const navigate = useNavigate();
  const [hotel, setHotel] = useState();
  const [count, setCount] = useState();
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setHotel(props.value);
  }, [props]);

  useEffect(() => {
    hotelApi
      .get('/fetch-data-counts')
      .then((response) => {
        setCount(response.data);
      })
      .catch((error) => {
      });
  }, []);
  return (
    <>
      <div className='flex flex-col  '>
        <div className='p-10 flex justify-around w-full'>
          <div className='border px-10 py-3 h-20 w-60 bg-gradient-to-br from-red-900  to-rose-500 '>
            <h1 className='tracking-wider font-bold text-gray-50'>Total Bookings</h1>
            <h4 className='text-gray-100'>{count?.totalBookings}</h4>
          </div>
          <div className='border px-10 py-3 h-20 w-60 bg-gradient-to-br from-red-900  to-rose-500'>
            <h1 className='tracking-wider font-bold text-gray-50'>Total Sale</h1>
            <h4 className='text-gray-100'>{count?.totalSale}</h4>
          </div>
          <div className='border px-10 py-3 h-20 w-60 bg-gradient-to-br from-red-900  to-rose-500'>
            <h1 className='tracking-wider font-bold text-gray-50'>sales of the month</h1>
            <h4 className='text-gray-100'>{count?.monthSale}</h4>
          </div>
          <div className='border px-10 py-3 h-20 w-60 bg-gradient-to-br from-red-900  to-rose-500'>
            <h1 className='tracking-wider font-bold text-gray-50'>sales of the week</h1>
            <h4 className='text-gray-100'>{count?.weekSale}</h4>
          </div>
        </div>
        <div className='w-3/ h-auto border border-red-800 shadow-lg mx-12 flex flex-col p-10 justify-around'>
          <h1 className='my-2 font-bold tracking-wider text-green-400'>This account is {hotel?.status}</h1>
          <h1 className='text-gray-500'>{hotel?.message}</h1>
          {hotel?.status == 'Rejected' && (
            <button className='text-blue-900 hover:underline' onClick={() => navigate('/hotel-register-form')}>
              {' '}
              Re-apply
            </button>
          )}
        </div>
        <div className='my-10'>
          <LineChartComponent />
        </div>
      </div>
    </>
  );
}

export default HotelDashboard;
