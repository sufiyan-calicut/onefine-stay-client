import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelDashboard from './HotelDashboard';
import RoomMangement from './RoomMangement';
import { hotelApi } from '../../api/hotelApi';
import BookingManagement from './BookingComponents/BookingManagement';
import Sales from './Sales/Sales';

function SelectorComponent() {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState('dashboard');
  const [hotel, setHotel] = useState();

  useEffect(() => {
    hotelApi
      .post('/fetch-hotel-data')
      .then((response) => {
        setHotel(response.data.data);
      })
      .catch((error) => {
      });
  }, []);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };
  let componentToRender;
  switch (selectedButton) {
  case 'dashboard':
    componentToRender = <HotelDashboard value={hotel} />;
    break;
  case 'rooms':
    componentToRender = <RoomMangement />;
    break;
  case 'bookings':
    componentToRender = <BookingManagement />;
    break;
  case 'sales':
    componentToRender = <Sales />;
    break;
  default:
    componentToRender = null;
    break;
  }
  return (
    <div className='flex w-screen'>
      <div className='w-64'>
        <div className='bg-red-900  h-screen  flex flex-col '>
          <h1 className='text-white font-semibold text-lg text-center my-8'>{hotel?.hotelName}</h1>
          <div className='p-4 mt-32'>
            <ul className='flex flex-col gap-2'>
              <li
                className={`${
                  selectedButton == 'dashboard'
                    ? 'text-white bg-red-800 hover:text-gray-200 py-2 px-4 rounded'
                    : 'text-white hover:bg-red-800 hover:text-gray-200 py-2 px-4 rounded'
                }`}
                onClick={() => handleButtonClick('dashboard')}
              >
                Home
              </li>
              {/* <li
                onClick={() => handleButtonClick('rooms')}
                className={`${
                  selectedButton == 'rooms'
                    ? 'text-white bg-red-800 hover:text-gray-200 py-2 px-4 rounded'
                    : 'text-white hover:bg-red-800 hover:text-gray-200 py-2 px-4 rounded'
                }`}
              >
                Room Management
              </li> */}
              <li
                onClick={() => handleButtonClick('bookings')}
                className={`${
                  selectedButton == 'bookings'
                    ? 'text-white bg-red-800 hover:text-gray-200 py-2 px-4 rounded'
                    : 'text-white hover:bg-red-800 hover:text-gray-200 py-2 px-4 rounded'
                }`}
              >
                Bookings
              </li>
              <li
                onClick={() => handleButtonClick('sales')}
                className={`${
                  selectedButton == 'sales'
                    ? 'text-white bg-red-800 hover:text-gray-200 py-2 px-4 rounded'
                    : 'text-white hover:bg-red-800 hover:text-gray-200 py-2 px-4 rounded'
                }`}
              >
                Sales
              </li>
              <li
                className='text-white hover:bg-red-800 hover:text-gray-200 py-2 px-4 rounded'
                onClick={() => {
                  localStorage.removeItem('hotelToken');
                  navigate('/hotel');
                }}
              >
                Logout
              </li>
            </ul>
          </div>
          <div className='p-4'>{/* Additional content, if needed */}</div>
        </div>
      </div>
      <div className='h-screen w-full overflow-auto'>{componentToRender}</div>
    </div>
  );
}

export default SelectorComponent;
