import React, { useEffect, useState } from 'react';
import { userApi } from '../../../api/userApi';
import Bookings from './Bookings';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../../reduxToolkit/alertsReducer';

function BookingHistory() {
  const [searchInput, setSearchInput] = useState('');
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      dispatch(showLoading());
      try {
        const response = await userApi.get('/fetch-all-bookings');
        setBookings(response.data.bookings);
        dispatch(hideLoading());
      } catch (error) {
        dispatch(hideLoading());

      }
    }

    fetchData();
  }, []);

  const handleSearch = () => {
    userApi
      .post('/fetch-search-book', { searchInput })
      .then((response) => {
        setBookings(response.data.bookings);
      })
      .catch((error) => {

      });
  };
  return (
    <div className=' w-full  md:w-5/6 h-full text-black overflow-auto md:p-10 flex items-start justify-center'>
      {bookings?.length == 0 ? (
        <div className='font-bold text-gray-500'>You don't have booking history</div>
      ) : (
        <div className='bg-cyan-800 h-auto w-full md:w-3/4'>
          <textarea
            className='w-full h-10 text-center cursor-text border border-cyan-800'
            placeholder='search bookings....'
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
          ></textarea>
          {bookings != 0 && (
            <div className='w-full h-auto flex flex-col gap-1 cursor-pointer '>
              <div className='w-full h-12 bg-cyan-900 flex gap-2 items-center justify-around text-gray-300'>
                <div className='w-1/4 text-center'>HotelName</div>
                <div className='w-1/4 text-center'>Booking Date</div>
                <div className='w-1/4 text-center'>Status</div>
                <div className='w-1/4 text-center'>View</div>
              </div>
              {bookings?.map((booking, index) => {
                return <Bookings key={index} value={booking} />;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BookingHistory;
