import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../api/adminApi';
import { toast } from 'react-hot-toast';

function Dashboard() {
  const [active, setActive] = useState();
  const [pending, setPending] = useState();
  const [block, setBlock] = useState();
  const [hotels, setHotels] = useState();
  const [searchInput, setSearchInput] = useState([]);
  useEffect(() => {
    adminApi
      .get('/fetch-hotel-counts')
      .then((response) => {
        setActive(response.data.Active);
        setBlock(response.data.Block);
        setPending(response.data.Pending);
      })
      .catch((error) => {
      });
  });
  const handleSearch = () => {
    adminApi
      .post('/fetch-search-book', { searchInput })
      .then((response) => {
        setHotels(response.data.bookings);
      })
      .catch((error) => {
      });
  };
  return (
    <div className='w-full flex flex-col h-auto   text-black'>
      <div className='w-fit h-fit flex flex-row  '>
        <div className='bg-white font-semibold w-fit border  text-black px-6 py-2 mx-10 my-2 rounded-md shadow-md hover:shadow-lg hover:border-green-900 hover:bg-gray-50 hover:text-gray-700 duration-700'>
          <h1>Active Hotels</h1>
          <h4>{active}</h4>
        </div>
        <div className='bg-white font-semibold w-fit border  text-black px-6 py-2 mx-10 my-2 rounded-md shadow-md hover:shadow-lg hover:border-green-900 hover:bg-gray-50 hover:text-gray-700 duration-700'>
          <h1>New Requests</h1>
          <h4>{pending}</h4>
        </div>
        <div className='bg-white font-semibold w-fit border  text-black px-6 py-2 mx-10 my-2 rounded-md shadow-md hover:shadow-lg hover:border-green-900 hover:bg-gray-50 hover:text-gray-700 duration-700'>
          <h1>Blocked Hotels</h1>
          <h4>{block}</h4>
        </div>
      </div>
      <div className='bg-red-80  w-5/6 h-full text-black overflow-auto  p-10 flex items-start justify-center'>
        <div className='bg-cyan-800 h-auto w-2/4 '>
          <textarea
            className='w-full h-10 text-center cursor-text border border-cyan-800 '
            placeholder='search bookings....'
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
          ></textarea>
          {hotels != 0 && (
            <div className='w-full h-auto flex flex-col gap-1'>
              <div className='w-full h-12 bg-cyan-900 flex gap-2 items-center justify-around text-gray-300'>
                <div>HotelName</div>
                <div>Booking Date</div>
                <div>Status</div>
                <div>View</div>
              </div>

              {hotels?.map((booking, index) => {
                // return <Bookings key={index} value={booking} />;
                <h2>data,{index}</h2>;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
