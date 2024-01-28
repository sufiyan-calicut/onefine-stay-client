import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../api/adminApi';
import { toast } from 'react-hot-toast';
import SingleBookingData from './SingleBookingData';

function BookingData(props) {
  // eslint-disable-next-line react/prop-types
  let status = props.value;
  const [booking, setBooking] = useState();

  useEffect(() => {
    adminApi
      .post('/fetch-bookings', { status })
      .then((response) => {
        setBooking(response.data.bookings);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [props]);

  return (
    <div className=' w-full h-auto flex flex-col gap- '>
      {booking?.length === 0 ? (
        <div className=' h-auto py-20 w-full overflow-hidden flex items-center justify-center'>
          <h1 className='font-extrabold text-5xl tracking-wider text-gray-300'>No Data</h1>
        </div>
      ) : (
        <div className='h-auto border border-cyan-900 mx-4'>
          <div className='bg-cyan-900 text-sm text-gray-100 flex justify-around  font- tracking-wider  cursor-default h-12 items-center  '>
            <h1>BOOKING ID</h1>
            <h1>USER NAME</h1>
            <h1>HOTEL NAME</h1>
            <h1>BOOKING DATE</h1>
            <h1>STATUS</h1>
            <h1>EDIT</h1>
          </div>
          {booking?.map((booking, index) => {
            return <SingleBookingData key={index} value={booking} />;
          })}
        </div>
      )}
    </div>
  );
}

export default BookingData;
