import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    checkInDate,
    checkOutDate,
    bookingId,
    hotel_name,
    totalGuest,
    singleRoomPrice,
    totalPrice,
    totalRooms,
    totalStayDays,
  } = location.state;

  return (
    <div className='booking-success  min-h-screen  md:bg-gradient-to-b from-black to-slate-900  flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
      <div className='bg-white rounded-lg shadow-lg p-8  m-10 max-w-md w-full'>
        <div className='flex justify-end mb-2 items-end tracking-wider gap-2'>
          <p className=' text-gray-700 font-bold text-xs'>BOOKING ID:</p>
          <p className='text-lg text-gray-900 font-bold'>{bookingId}</p>
        </div>
        <h2 className='text-xl text-green-700 font-bold text-center mb-4'>Booking Successful!</h2>
        <p className='text-lg text-center text-gray-700 mb-8'>
          Thank you for choosing <span className='text-blue-400 font-semibold'>{hotel_name}</span> for your stay.
        </p>
        <div className='flex justify-between mb-1'>
          <p className='text-sm text-gray-700'>Hotel Name:</p>
          <p className='text-sm text-gray-900'>{hotel_name}</p>
        </div>
        <div className='flex justify-between mb-1'>
          <p className='text-sm text-gray-700'>Check-In Date:</p>
          <p className='text-sm text-gray-900'>{checkInDate}</p>
        </div>
        <div className='flex justify-between mb-1'>
          <p className='text-sm text-gray-700'>Check-Out Date:</p>
          <p className='text-sm text-gray-900'>{checkOutDate}</p>
        </div>
        <div className='flex justify-between mb-1'>
          <p className='text-sm text-gray-700'>Room Price:</p>
          <p className='text-sm text-gray-900'>${singleRoomPrice}</p>
        </div>
        <div className='flex justify-between mb-1'>
          <p className='text-sm text-gray-700'>Total Rooms:</p>
          <p className='text-sm text-gray-900'>{totalRooms}</p>
        </div>

        <div className='flex justify-between mb-1'>
          <p className='text-sm text-gray-700'>Total stay Days</p>
          <p className='text-sm text-gray-900'>{totalStayDays}</p>
        </div>
        <div className='flex justify-between mb-1'>
          <p className='text-sm text-gray-700'>Total Guest:</p>
          <p className='text-sm text-gray-900'>{totalGuest}</p>
        </div>
        <div className='flex justify-between mb-4'>
          <p className='text-lg text-blue-700 font-bold'>Total Price:</p>
          <p className='text-lg text-red-600 font-bold'>${totalPrice}/-</p>
        </div>
        <p className='text-lg text-gray-300 bg-blue-800 text-center border rounded-lg p-4'>
          We hope you enjoy your stay!
        </p>
        <button
          className='text-lg text-gray-300 hover:underline duration-300  text-center  rounded-lg  text-gray-500 w-full text-center m-4'
          onClick={() => navigate('/')}
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
