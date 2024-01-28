import React, { useNavigate } from 'react';

const Sidebar = () => {
  return (
    <div className='bg-black h-screen w-64 flex flex-col justify-between'>
      <div className='p-4 mt-32'>
        <ul>
          <li className='text-white hover:bg-gray-800 hover:text-gray-200 py-2 px-4 rounded'>Home</li>
          <li className='text-white hover:bg-gray-800 hover:text-gray-200 py-2 px-4 rounded'>RoomMangaement</li>
          <li className='text-white hover:bg-gray-800 hover:text-gray-200 py-2 px-4 rounded'>Contact</li>
        </ul>
      </div>
      <div className='p-4'>{/* Additional content, if needed */}</div>
    </div>
  );
};

export default Sidebar;
