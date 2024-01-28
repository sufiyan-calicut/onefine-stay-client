import React, { useEffect, useState } from 'react';
import { hotelApi } from '../../../api/hotelApi';
import { toast } from 'react-hot-toast';

function UpcomingBookings() {
  const [request, setRequest] = useState();
  useEffect(() => {
    hotelApi
      .get('/fetch-upcoming-bookings')
      .then((response) => {
        setRequest(response.data.bookings);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, []);
  return (
    <div className=' px-10'>
      <div className='mt-4 border'>
        <div className=' h-14 flex justify-around items-center rounded-sm  shadow-transparent border bg-gray-200 duration-300 '>
          <h4>Booking ID</h4>

          <h4>Check In Date</h4>
          <h4>Check Out Date</h4>
          <h4>Total Stay Days</h4>
          <h4>Total Guest</h4>
          <h4>Status</h4>
        </div>
        {request?.map((request, i) => {
          return (
            <div
              key={i}
              className='bg-gray-100 cursor-pointer flex justify-around items-center font-normal h-14 mx-4 my-2 rounded-sm  hover:shadow-transparent hover:border hover:bg-gray-200 duration-300 '
            >
              <p>{request.bookingId}</p>
              <p>{request?.checkInDate}</p>
              <p>{request?.checkOutDate}</p>
              <p>{request?.totalStayDays}</p>
              <p>{request?.totalGuest}</p>
              <p>{request?.status}</p>
            </div>
          );
        })}
       
      </div>
    </div>
  );
}

export default UpcomingBookings;
