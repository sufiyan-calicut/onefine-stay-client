import React, { useEffect, useState } from 'react';
import { userApi } from '../../../api/userApi';
import { toast } from 'react-hot-toast';
import { IoIosExpand } from 'react-icons/io';

function Bookings(props) {
  const [counter, setCounter] = useState(0);
  const [reasonDiv, setReasonDiv] = useState(false);
  const [booking, setBooking] = useState(props.value);
  const [reasonText, setReasonText] = useState('');
  const [details, setDetails] = useState(false);

  useEffect(() => {
    setCounter((counter) => (counter += 1));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setBooking(props.value);
  }, [props]);

  const handleCancelBooking = () => {
    const bookingData = {
      booking,
      reasonText,
    };
    if (!reasonText) return toast.error('write a reason for cancellation');
    userApi
      .post('/cancel-booking', { bookingData })
      .then((response) => {
        toast.success(response.data.message);
        setDetails(false);

        setBooking(response.data.data);
      })
      .catch((error) => {

        toast.error(error.response.data.message);
      });
  };
  return (
    <div className='w-full  flex flex-col gap-1'>
      <div className='w-full min-h-12 h-auto border-b border-cyan-900 bg-cyan-800 hover:bg-cyan-900 duration-300 flex gap-2 items-center justify-around text-gray-300'>
        <div className='w-1/4 text-center px-2 py-3'>{booking?.hotelname}</div>
        <div className='w-1/4 text-center px-2 py-3'>{booking?.checkInDate}</div>
        <div className='w-1/4 text-center px-2 py-3'>{booking?.status}</div>
        <div className='w-1/4 flex justify-center px-2 py-3' onClick={() => setDetails(!details)}>
          <IoIosExpand />
        </div>
      </div>
      {details && (
        <div className='w-full h-auto grid grid-cols-3 gap-4 px-6 py-10 bg-cyan-700'>
          <div className='flex flex-col items-start justify-center'>
            <h4 className='font-semibol text-white tracking-wider'>BookingId</h4>
            <p className='text-gray-400'>{booking?.bookingId}</p>
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h4 className='font-semibol text-white tracking-wider'>Hotel Name</h4>
            <p className='text-gray-400'>{booking?.hotelname}</p>
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h4 className='font-semibol text-white tracking-wider'>Booking Date</h4>
            <p className='text-gray-400'>{booking?.checkInDate}</p>
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h4 className='font-semibol text-white tracking-wider'>Check In Date</h4>
            <p className='text-gray-400'>{booking?.checkInDate}</p>
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h4 className='font-semibol text-white tracking-wider'>Check Out Date</h4>
            <p className='text-gray-400'>{booking?.checkOutDate}</p>
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h4 className='font-semibol text-white tracking-wider'>total rooms</h4>
            <p className='text-gray-400'>{booking?.totalRooms}</p>
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h4 className='font-semibol text-white tracking-wider'>total stay days</h4>
            <p className='text-gray-400'>{booking?.totalStayDays}</p>
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h4 className='font-semibol text-white tracking-wider'>total guests</h4>
            <p className='text-gray-400'>{booking?.totalGuest}</p>
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h4 className='font-semibol text-white tracking-wider'>sinle Room Price</h4>
            <p className='text-gray-400'>{booking?.singleRoomPrice}</p>
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h4 className='font-semibol text-white tracking-wider'>Total</h4>
            <p className='text-gray-400'>{booking?.totalPrice}</p>
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h4 className='font-semibol text-white tracking-wider'>Online Payment</h4>
            <p className='text-gray-400'>{booking?.paidByCash}</p>
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h4 className='font-semibol text-white tracking-wider'>Wallet Payment</h4>
            <p className='text-gray-400'>{booking?.paidByWallet}</p>
          </div>
          {booking?.status == 'cancelled' ? (
            <>
              <div className='flex flex-col   items-start justify-center'>
                <h4 className='font-semibol text-white tracking-wider'>Booking Status</h4>
                <p className='text-gray-400'>{booking?.status}</p>
              </div>
              <div className='flex flex-col  items-start justify-center'>
                <h4 className='font-semibol text-white tracking-wider'>Cancelled By</h4>
                <p className='text-gray-400'>{booking?.cancelledBy}</p>
              </div>
              <div className='flex flex-col  col-span-3 items-start justify-center'>
                <h4 className='font-semibol text-white tracking-wider'>Reason for Cancellation</h4>
                <p className='text-gray-400'>{booking?.message} </p>
              </div>
            </>
          ) : (
            <div className='flex flex-col   items-start justify-center'>
              <h4 className='font-semibol text-white tracking-wider'>Booking Status</h4>
              <p className='text-gray-400'>{booking?.status}</p>
            </div>
          )}

          {booking && ['pending', 'active', 'accepted'].includes(booking.status) && (
            <>
              <div className='flex flex-col items-start justify-center'>
                <button
                  className='font-sm p-2 hover:bg-orange-700 duration-300 hover:text-white text-red-700 tracking-wider bg-white'
                  onClick={() => setReasonDiv(true)}
                >
                  Cancel Booking
                </button>
                {/* <p className='text-gray-400'>content</p> */}
              </div>
              {reasonDiv && (
                <div className='flex flex-col items-start justify-cente col-span-3 '>
                  <textarea
                    className='w-full focus:outline-none p-2'
                    placeholder='Write a reason for this cancellation'
                    onChange={(e) => setReasonText(e.target.value)}
                  ></textarea>
                  <div className='flex gap-2 m-2'>
                    <p
                      className='text-gray-400 hover:text-white cursor-pointer hover:underline '
                      onClick={handleCancelBooking}
                    >
                      confirm
                    </p>
                    <p
                      className='text-gray-400 hover:text-white cursor-pointer hover:underline'
                      onClick={() => setReasonDiv(false)}
                    >
                      cancel
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Bookings;
