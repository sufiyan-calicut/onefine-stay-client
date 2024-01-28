import React, { useEffect, useState } from 'react';
import BookingSearch from './BookingSearch';
import { hotelApi } from '../../../api/hotelApi';
import { toast } from 'react-hot-toast';

function BookingDashboard() {
  const [showToast, setShowToast] = useState(false);
  const [liveCount, setLiveCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [newRequestCount, setNewRequestCount] = useState(0);
  useEffect(() => {
    hotelApi
      .get('/get-data-counts')
      .then((response) => {
        setLiveCount(response.data.liveCount);
        setUpcomingCount(response.data.upcomingCount);
        setCompletedCount(response.data.completedCount);
        setNewRequestCount(response.data.newRequestCount);
      })
      .catch((error) => {
      });
  }, []);
  const [result, setResult] = useState([]);
  const [inputData, setInputData] = useState('');
  const handleSearch = () => {
    if (!inputData) {
      return toast.error('give booking id / username', { id: 'noDataToast' });
    }
    hotelApi
      .post('/search-bookings', { inputData })
      .then((response) => {
        setResult(response.data.bookings);
      })
      .catch((error) => {
        toast.error(error.response.data.message, { id: 'catchToast' });
      });
  };

  return (
    <div className=' p-4  gap-3 flex flex-row flex-wrap bg-blac'>
      <div className='flex justify-center gap-1 w-full'>
        <div className='bg-gray-50 cursor-pointer font-semibold w-fit border h-fit text-black px-4 py-4   shadow-md hover:shadow-lg hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 duration-700'>
          <h1 className='text-blue-700 mt-'>Live Bookings</h1>
          <h4>{liveCount}</h4>
        </div>
        <div className='bg-gray-50 cursor-pointer font-semibold w-fit border h-fit text-black px-4 py-4   shadow-md hover:shadow-lg hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 duration-700'>
          <h1 className='text-green-700'>Upcoming Bookings</h1>
          <h4>{upcomingCount}</h4>
        </div>
        <div className='bg-gray-50 cursor-pointer font-semibold w-fit border h-fit text-black px-4 py-4   shadow-md hover:shadow-lg hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 duration-700'>
          <h1 className='text-slate-700'>Completed Bookings</h1>
          <h4>{completedCount}</h4>
        </div>
        <div className='bg-gray-50 cursor-pointer font-semibold w-fit border h-fit text-black px-4 py-4   shadow-md hover:shadow-lg hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 duration-700'>
          <h1 className='text-orange-700'>New Requests</h1>
          <h4>{newRequestCount}</h4>
        </div>
      </div>
      <div className='flex justify-center h-auto w-full mt-10'>
        <div className=' bg-gray-50  border px-4 flex flex-col items-center justify-center'>
          <h1 className='text-gray-500 my-4 font-semibold'>SEARCH BOOKING ID / USER NAME</h1>
          <div className=' h-auto mb-10  w-ful flex '>
            <textarea
              name=''
              id=''
              cols='60'
              rows='1'
              className='p-1 text-center h-10 border border-gray-400'
              onChange={(e) => setInputData(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  handleSearch();
                  // Do something else, such as submitting the form
                }
              }}
            ></textarea>
            <button
              className='h-10 ml-1 px-2 bg-blue-800 text-gray-200 hover:bg-blue-900 duration-300'
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {result?.length != 0 && (
            <div className='border mb-3 cursor-pointer w-full flex flex-col justify-center shadow-md'>
              <div className='flex justify-around bg-gray-500 p-2 text-gray-50'>
                <h4>Booking id</h4>
                <h4>Costomer Name</h4>
                <h4>Edit</h4>
              </div>

              {result?.map((result, index) => {
                return <BookingSearch key={index} value={result} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingDashboard;
