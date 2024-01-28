import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { adminApi } from '../../../api/adminApi';
import { toast } from 'react-hot-toast';
import SearchResult from './SearchResult';

function BookingDashboard() {
  const [editDiv, setEditDiv] = useState(false);
  const [liveCount, setLiveCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [newRequestCount, setNewRequestCount] = useState(0);
  const [cancelledBookings, setCancelledBookings] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [inputData, setInputData] = useState('');
  const [result, setResult] = useState([]);
  useEffect(() => {
    adminApi
      .get('/get-data-counts')
      .then((response) => {
        setLiveCount(response.data.liveCount);
        setUpcomingCount(response.data.upcomingCount);
        setCompletedCount(response.data.completedCount);
        setNewRequestCount(response.data.newRequestCount);
        setTotalBookings(response.data.totalBookings);
        setCancelledBookings(response.data.cancelledBookings);
      })
      .catch((error) => {

      });
  }, []);

  const handleSearch = () => {
    if (!inputData) {
      return toast.error('give booking id / username', { id: 'noDataToast' });
    }
    adminApi
      .post('/search-bookings', { inputData })
      .then((response) => {
        setResult(response.data.bookings);
      })
      .catch((error) => {
  
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className=' w-full h-auto'>
      <div className='flex justify-around'>
        <div className='flex flex-col gap-2 text-gray-600 border  hover:bg-teal-800 hover:shadow-md  hover:text-white duration-700 border-teal-900 p-2'>
          <h1 className=''>Total Bookings</h1>
          <h4 className='font-semibold text-center '>{totalBookings}</h4>
        </div>
        <div className='flex flex-col gap-2 text-gray-600 border hover:bg-teal-800 hover:shadow-md  hover:text-white duration-700 border-teal-900 p-2'>
          <h1 className=''>New Bookings</h1>
          <h4 className='font-semibold text-center '>{newRequestCount}</h4>
        </div>
        <div className='flex flex-col gap-2 text-gray-600 border hover:bg-teal-800 hover:shadow-md  hover:text-white duration-700 border-teal-900 p-2'>
          <h1 className=''>Accepted Bookings</h1>
          <h4 className='font-semibold text-center '>{upcomingCount}</h4>
        </div>
        <div className='flex flex-col gap-2 text-gray-600 border hover:bg-teal-800 hover:shadow-md  hover:text-white duration-700 border-teal-900 p-2'>
          <h1 className=''>Active Bookings</h1>
          <h4 className='font-semibold text-center '>{liveCount}</h4>
        </div>
        <div className='flex flex-col gap-2 text-gray-600 border hover:bg-teal-800 hover:shadow-md  hover:text-white duration-700 border-teal-900 p-2'>
          <h1 className=''>Completed Bookings</h1>
          <h4 className='font-semibold text-center '>{completedCount}</h4>
        </div>
        <div className='flex flex-col gap-2 text-gray-600 border hover:bg-teal-800 hover:shadow-md  hover:text-white duration-700 border-teal-900 p-2'>
          <h1 className=''>Cancelled Bookings</h1>
          <h4 className='font-semibold text-center '>{cancelledBookings}</h4>
        </div>
      </div>
      <div className='flex justify-center h-auto w-full mt-10'>
        <div className=' bg-gray-50  border px-4 flex flex-col items-center justify-center'>
          <h1 className='text-gray-500 my-4 font-semibold'>SEARCH BOOKING</h1>
          <div className=' h-auto mb-10  w-ful flex '>
            <textarea
              name=''
              id=''
              cols='60'
              rows='1'
              placeholder='Search by booking id/hotel id/hotel name/user name'
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
              className='h-10 ml-1 px-2 bg-cyan-800 text-gray-200 hover:bg-cyan-900 duration-300'
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {result?.length != 0 && (
            <div className='border mb-3 cursor-pointer w-full flex flex-col justify-center shadow-md'>
              <div className='flex justify-around bg-cyan-900 p-2 text-gray-50'>
                <h4>Booking id</h4>
                <h4>Costomer Name</h4>
                <h4>Edit</h4>
              </div>
              <div>
                {result.map((booking, index) => {
                  return <SearchResult key={index} value={booking} />;
                })}

              
              </div>

              {/* {result?.map((result, index) => {
                return <BookingSearch key={index} value={result} />;
              })} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingDashboard;
