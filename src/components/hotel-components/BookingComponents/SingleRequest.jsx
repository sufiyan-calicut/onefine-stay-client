import React, { useState, memo, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineClose } from 'react-icons/ai';
import { hotelApi } from '../../../api/hotelApi';
import { setBooking } from '../../../reduxToolkit/hotelBookingSlice';
import { useDispatch } from 'react-redux';

const SingleRequest = memo(({ value }) => {
  const dispatch = useDispatch();
  const [booking, setBooking] = useState();
  const [declineMessage, setDeclineMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    setBooking(value);
  }, [value]);

  const [popup, setPopup] = useState(false);
  const confirmAccept = async (hotelID) => {
    try {
      await hotelApi.post('/accept-booking-request', { hotelID }).then(() => {
        // setNewHotels(response.data.newHotels);
        // toast.success(response.data.message);
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  //   const handleAccept = () => {
  //     if (!showToast) {
  //       setShowToast(true);
  //       toast.loading((t) => (
  //         <div className='flex flex-col text-center justify-center'>
  //           <p className='text-red-700 m-2 font-sans font-semibold'>Are you sure you want decline this Booking ?</p>

  //           <div className=' flex justify-end  gap-4'>
  //             <button
  //               className='text-red-900 font-sans hover:underline font-normal'
  //               onClick={() => {
  //                 setShowToast(false);
  //                 toast.dismiss(t.id);
  //               }}
  //             >
  //               No
  //             </button>
  //             <button
  //               className='text-blue-900 font-sans hover:underline font-normal'
  //               onClick={() => {
  //                 toast.dismiss(t.id);
  //                 setShowToast(false);
  //                 confirmAccept(hotel._id);
  //               }}
  //             >
  //               Yes
  //             </button>
  //           </div>
  //         </div>
  //       ));
  //     }
  //   };

  const handleAccept = () => {
    hotelApi
      .put('/accept-booking', { bookingId: booking._id })
      .then((response) => {
        toast.success(response.data.message);
        // const newBookings = booking.filter((book) => book._id != booking._id);
        setBooking('');
        // setBooking(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDecline = () => {
    hotelApi
      .put('/decline-booking', { bookingId: booking._id, message: declineMessage, data: booking })
      .then((response) => {
        toast.success(response.data.message);
        setBooking('');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      {booking && (
        <div className='h-fit flex flex-col gap-2 text-s font-semibold  bg-white shadow-md border hover:shadow-lg hover:border-gray-300  hover:text-gray-700 duration-700'>
          <div className=' text-gray-500 grid   grid-cols-3  gap-3  justify-around cursor-pointer w-fit    px-10 py-4   '>
            <h1>
              Booking ID : <span className='font-normal text-black '>{booking?.bookingId}</span>
            </h1>
            <h4>
              CheckIn : <span className='font-normal text-black'>{booking?.checkInDate}</span>{' '}
            </h4>
            <h4>
              Total Rooms: <span className='font-normal text-black'>{booking?.totalRooms}</span>{' '}
            </h4>
            <h4>
              Total Guests: <span className='font-normal text-black'>{booking?.totalGuest}</span>
            </h4>
            <h4>
              CheckOut : <span className='font-normal text-black'>{booking?.checkOutDate}</span>
            </h4>

            <h4>
              Payment : <span className='font-normal text-black'>{booking?.status}</span>{' '}
            </h4>
          </div>
          <div className='h-10 pr-4 w-full flex justify-end gap-4 text-sm'>
            <button className='text-green-700' onClick={handleAccept}>
              Accept
            </button>
            <button className='text-red-700' onClick={() => setPopup(true)}>
              Decline
            </button>
          </div>

          {popup && (
            <div className='border border-b-0 px-10 bg-gray-50 gap-2 flex flex-col justify-center h-44 w-full'>
              <div className=' flex justify-end'>
                <button onClick={() => setPopup(false)} className='border border-gray-50 hover:border-gray-300'>
                  <AiOutlineClose />
                </button>
              </div>
              <div>
                <h1 className='left-0  font-normal'>Write a reason for this cancellation</h1>
                <textarea
                  onChange={(e) => setDeclineMessage(e.target.value)}
                  className='h-12 p-1 font-normal text-sm left-0 right-0 mx-auto w-full border border-gray-300 '
                />
              </div>

              <div className=' flex justify-end'>
                <button className='hover:underline text-blue-600' onClick={handleDecline}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
});

SingleRequest.displayName = 'SingleRequest';

export default SingleRequest;
