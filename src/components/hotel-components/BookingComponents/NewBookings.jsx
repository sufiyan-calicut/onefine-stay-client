import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleRequest from './SingleRequest';
import { hotelApi } from '../../../api/hotelApi';
import { showLoading, hideLoading } from '../../../reduxToolkit/alertsReducer';
import { setBooking } from '../../../reduxToolkit/hotelBookingSlice';

function NewBookings() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.booking.booking);

  useEffect(() => {
    dispatch(showLoading());
    hotelApi
      .post('/get-new-requests')
      .then((response) => {
        dispatch(hideLoading());
        dispatch(setBooking(response.data.newBookings));
        // setNewRequests([...data]);
      })
      .catch((error) => {
        dispatch(hideLoading());
      });
  }, []);

  return (
    <div className='bg-gray-50 h-full  flex justify-center '>
      <div className='  h-full flex flex-col my-10'>
        {data?.length == 0 ? (
          // eslint-disable-next-line react/no-unescaped-entities
          <p className='text-gray-500 tracking-wider text-xl'>You Don't Have New Requests</p>
        ) : (
          data?.map((request, i) => {
            return <SingleRequest key={i} value={request} />;
          })
        )}
      </div>
    </div>
  );
}

export default NewBookings;
