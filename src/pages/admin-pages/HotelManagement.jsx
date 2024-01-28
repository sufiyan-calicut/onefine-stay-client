import React, { useState } from 'react';
import Layout from '../../components/admin-components/Layout';
import Dashboard from '../../components/admin-components/room-components/Dashboard';
import NewRequests from '../../components/admin-components/room-components/NewRequests';
import HotelLists from '../../components/admin-components/room-components/HotelLists';
import HotelRanks from '../../components/admin-components/room-components/HotelRanks';
import DonutChart from './DonutChart';

function HotelManagement() {
  const [selectedButton, setSelectedButton] = useState('dashboard');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  let componentToRender;
  switch (selectedButton) {
  case 'dashboard':
    componentToRender = <Dashboard />;
    break;
  case 'request':
    componentToRender = <NewRequests />;
    break;
  case 'hotelList':
    componentToRender = <HotelLists />;
    break;
  case 'ranks':
    componentToRender = <HotelRanks />;
    break;
  case 'other':
    // Add code to render Other component
    break;
  default:
    componentToRender = null;
    break;
  }

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
            className={selectedButton === 'request' ? 'hotel-button border-green-800 ' : 'hotel-button'}
            onClick={() => handleButtonClick('request')}
          >
            New Requests
          </button>
          <div
            className={selectedButton === 'hotelList' ? 'hotel-button border-green-800 ' : 'hotel-button'}
            onClick={() => handleButtonClick('hotelList')}
          >
            Hotels list
          </div>
          
        </div>

        {componentToRender}
      </div>
    </Layout>
  );
}

export default HotelManagement;
