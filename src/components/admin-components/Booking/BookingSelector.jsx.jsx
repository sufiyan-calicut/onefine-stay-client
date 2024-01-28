import React, { useState } from 'react';
import Layout from '../Layout';
import BookingDashboard from './BookingDashboard';
import { adminApi } from '../../../api/adminApi';
import { toast } from 'react-hot-toast';
import BookingData from './BookingData';

function BookingSelector() {
  const [selectedButton, setSelectedButton] = useState('dashboard');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleSearch = (status) => {
    adminApi
      .post('/fetch-bookings', { status })
      .then((response) => {
      })
      .catch((error) => {

        toast.error(error.response.data.message);
      });
  };

  return (
    <Layout>
      <div className='w-full h-fit flex flex-col'>
        <div className='w-full h-fit flex '>
          <div
            className={selectedButton === 'dashboard' ? 'hotel-button border-green-800  ' : 'hotel-button'}
            onClick={() => handleButtonClick('dashboard')}
          >
            Dashboard
          </div>
          <button
            className={selectedButton === 'booked' ? 'hotel-button border-green-800 ' : 'hotel-button'}
            onClick={() => {
              setSelectedButton('booked');
              handleSearch('booked');
            }}
          >
            New Requests
          </button>
          <div
            className={selectedButton === 'accepted' ? 'hotel-button border-green-800 ' : 'hotel-button'}
            onClick={() => {
              setSelectedButton('accepted');
              handleSearch('accepted');
            }}
          >
            Accepted Bookings
          </div>
          <div
            className={selectedButton === 'active' ? 'hotel-button border-green-800 ' : 'hotel-button'}
            onClick={() => {
              setSelectedButton('active');
              handleSearch('active');
            }}
          >
            Active Bookings
          </div>
          <div
            className={selectedButton === 'expired' ? 'hotel-button border-green-800 ' : 'hotel-button'}
            onClick={() => {
              setSelectedButton('expired');
              handleSearch('expired');
            }}
          >
            expired Bookings
          </div>
          <div
            className={selectedButton === 'cancelled' ? 'hotel-button border-green-800 ' : 'hotel-button'}
            onClick={() => {
              setSelectedButton('cancelled');
              handleSearch('cancelled');
            }}
          >
            cancelled Bookings
          </div>
        </div>

        {/* {componentToRender} */}
        {selectedButton != 'dashboard' ? <BookingData value={selectedButton} /> : <BookingDashboard />}
      </div>
    </Layout>
  );
}

export default BookingSelector;
