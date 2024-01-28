import React, { useState } from 'react';
import CurrentBookings from './CurrentBookings';
import UpcomingBookings from './UpcomingBookings';
import ExpiredBookingList from './ExpiredBookingList';
import BookingDashboard from './BookingDashboard';
import CancelledBookings from './CancelledBookings';
import NewBookings from './NewBookings';

function BookingManagement() {
  const [selected, setSelected] = useState('bookingDashboard');

  const handleButtonClick = (buttonName) => {
    setSelected(buttonName);
  };

  let divToRender;
  switch (selected) {
  case 'bookingDashboard':
    divToRender = <BookingDashboard />;
    break;
  case 'newBookings':
    divToRender = <NewBookings />;
    break;
  case 'currentBookings':
    divToRender = <CurrentBookings />;
    break;
  case 'upcomingBookings':
    divToRender = <UpcomingBookings />;
    break;
  case 'expiredBookings':
    divToRender = <ExpiredBookingList />;
    break;
  case 'cancelledBookings':
    divToRender = <CancelledBookings />;
    break;
  default:
    divToRender = <BookingDashboard/>;
    break;
  }
  return (
    <div className='w-full'>
      <div className='flex bg-gray-100 w-full'>
        <button
          className={`${
            selected == 'bookingDashboard'
              ? 'border bg-gray-600 rounded-t-md text-gray-100 border-gray-200 border-b-0 p-4'
              : 'border border-gray-200 p-4'
          }`}
          onClick={() => handleButtonClick('bookingDashboard')}
        >
          Booking Dashboard
        </button>
        <button
          className={`${
            selected == 'newBookings'
              ? 'border bg-gray-600 rounded-t-md text-gray-100 border-gray-200 border-b-0 p-4'
              : 'border border-gray-200 p-4'
          }`}
          onClick={() => handleButtonClick('newBookings')}
        >
          New Request
        </button>
        <button
          className={`${
            selected == 'currentBookings'
              ? 'border  bg-gray-600 rounded-t-md text-gray-100 p-4 border-gray-200 border-b-0'
              : 'border p-4 border-gray-200'
          }`}
          onClick={() => handleButtonClick('currentBookings')}
        >
          Current Bookings
        </button>
        <button
          className={`${
            selected == 'upcomingBookings'
              ? 'border  bg-gray-600 rounded-t-md text-gray-100 p-4 border-gray-200 border-b-0'
              : 'border p-4 border-gray-200'
          }`}
          onClick={() => handleButtonClick('upcomingBookings')}
        >
          Upcoming Bookings
        </button>
        <button
          className={`${
            selected == 'expiredBookings'
              ? 'border  bg-gray-600 rounded-t-md text-gray-100 p-4 border-gray-200 border-b-0'
              : 'border p-4 border-gray-200'
          }`}
          onClick={() => handleButtonClick('expiredBookings')}
        >
          Expired Booking List
        </button>
        <button
          className={`${
            selected == 'cancelledBookings'
              ? 'border  bg-gray-600 rounded-t-md text-gray-100 p-4 border-gray-200 border-b-0'
              : 'border p-4 border-gray-200'
          }`}
          onClick={() => handleButtonClick('cancelledBookings')}
        >
          Cancelled Bookings
        </button>
      </div>
      <div className='h-screen overflow-auto w-full '>{divToRender}</div>
    </div>
  );
}

export default BookingManagement;
