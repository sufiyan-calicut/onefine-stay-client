
import React, { useState } from 'react';
import AvailableRooms from './RoomManagement/AvailableRooms';
import AddNewRoom from './RoomManagement/AddNewRoom';
import ListedRooms from './RoomManagement/ListedRooms';

function RoomMangement() {
  const [selected, setSelected] = useState('availableRooms');

  const handleButtonClick = (buttonName) => {
    setSelected(buttonName);
  };

  let divToRender;
  switch (selected) {
  case 'availableRooms':
    divToRender = <AvailableRooms />;
    break;
  case 'addNewRoom':
    divToRender = <AddNewRoom />;
    break;
  case 'listedRooms':
    divToRender = <ListedRooms />;
    break;
  default:
    divToRender = null;
    break;
  }
  return (
    <div className=''>
      <div className='flex mx-5 bg-gray-100'>
        <button className={`${selected == 'availableRooms' ? 'border bg-gray-600 rounded-t-md text-gray-100 border-gray-200 border-b-0 p-4' : 'border border-gray-200 p-4'}`} onClick={() => handleButtonClick('availableRooms')}>
          available Rooms
        </button>
        <button className={`${selected == 'addNewRoom' ? 'border  bg-gray-600 rounded-t-md text-gray-100 p-4 border-gray-200 border-b-0' : 'border p-4 border-gray-200'}`} onClick={() => handleButtonClick('addNewRoom')}>
          add New Room
        </button>
        <button className={`${selected == 'listedRooms' ? 'border  bg-gray-600 rounded-t-md text-gray-100 p-4 border-gray-200 border-b-0' : 'border p-4 border-gray-200'}`} onClick={() => handleButtonClick('listedRooms')}>
          Listed Rooms
        </button>
      </div>
      <div className='h-screen'>
        {divToRender}
      </div>
    </div>
  );
}

export default RoomMangement;
