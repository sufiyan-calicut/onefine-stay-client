import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewGuest, addNewRoom, deleteRoom, removeGuest } from '../../../../reduxToolkit/searchSlice';

function RoomSelection() {
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const [showDiv, setShowDiv] = useState(true);
  const search = useSelector((state) => state.search);
  const roomCount = search.roomCounts;
  const guestCounts = [...search.guestCounts];

  


  const handleAddRoom = (e) => {
    e.stopPropagation();
    if (roomCount < 6) dispatch(addNewRoom());
  };

  const handleDeleteRoom = (e) => {
    e.stopPropagation();
    if (roomCount > 1) dispatch(deleteRoom());
  };

  const handleAddGuest = (index) => {
    if (guestCounts[index] < 3) dispatch(addNewGuest(index));
  };

  const handleRemoveGuest = (index) => {
    if (guestCounts[index] > 1) dispatch(removeGuest(index));
  };

  const rooms = [];
  for (let i = 0; i < roomCount; i++) {
    rooms.push(
      <div key={i} className='flex items-center p-2 border-b h-16 gap-4 font-semibold text-gray-600'>
        <div className='w-2/4'>
          <h2 className='font-sans'>Room{i + 1}</h2>
        </div>

        <div className='flex items-center font-semibold text-sm text-gray-600'>
          <button
            type='button'
            className='bg-white w-8 h-8 border-2 hover:shadow-xl hover:border-3 hover:duration-300 mx-4 flex items-center justify-center'
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveGuest(i);
            }}
          >
            <i className='ri-subtract-line'></i>
          </button>
          <h3>{guestCounts[i]}</h3>
          <button
            type='button'
            className='bg-white w-8 h-8 border-2 hover:shadow-xl hover:border-3 hover:duration-300 mx-4 flex items-center justify-center'
            onClick={(e) => {
              e.stopPropagation();
              handleAddGuest(i);
            }}
          >
            <i className='ri-add-line'></i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='absolute bg-white   rounded-md w-64 h-auto  z-10' onClick={(e) => e.stopPropagation()}>
      {showDiv && (
        <div ref={divRef} className='bg-blac  shadow-lg border'>
          <div className='flex justify-between items-center border-b p-2 font-semibold text-md text-gray-600'>
            <h3>Rooms</h3>
            <h3>Guests</h3>
          </div>

          {rooms}
          <div className='flex items-center px-2 h-14 gap-4 font-sm text-sm text-gray-600'>
            <div className={'hover:text-red-700 w-2/4 '} onClick={handleDeleteRoom}>
              Delete Room
            </div>
            <div className={'hover:text-blue-700 w-2/4'} onClick={handleAddRoom}>
              Add Room
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomSelection;
