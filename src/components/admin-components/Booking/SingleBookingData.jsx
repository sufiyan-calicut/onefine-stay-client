/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { adminApi } from '../../../api/adminApi';

function SingleBookingData(props) {
  const [booking, setBooking] = useState();
  const [editDiv, setEditDiv] = useState(false);
  // const [status, setStatus] = useState();
  const [inputValue, setInputValue] = useState();
  const [editStatus, setEditStatus] = useState(false);
  let [cancelled, setCancelled] = useState(false);
  useEffect(() => {
    setCancelled(false);
    setBooking(props.value);
    // setStatus(booking?.status);
    setEditDiv(false);
    if (props.value.status == 'cancelled') {
      setCancelled(true);
    }
  }, [props]);

  const handleStatus = (value) => {
    // if (value === status) return;
    if (value === 'cancelled') {
      setEditStatus(true);

    } else {
      const data = {
        value,
        id: booking._id,
      };
      adminApi
        .put('/change-status', { data })
        .then((response) => {
          // setBooking({});
          setBooking({
            ...booking,
            status: value,
          });
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };



  const createdAt = moment(booking?.createdAt).format('LLL');

  return (
    <div className='flex flex-col'>
      <div className='flex justify-around h-10 items-center border-b m-1 duration-300 cursor-pointer bg-gray-50 hover:bg-gray-100'>
        <h4>{booking?.bookingId}</h4>
        <h4>{booking?.userName}</h4>
        <h4>{booking?.hotelName}</h4>
        <h4>{createdAt}</h4>
        <h4>{booking?.status}</h4>
        <h4 onClick={() => setEditDiv(!editDiv)}>
          <FaRegEdit />
        </h4>
      </div>
      {editDiv && (
        <div className='grid grid-cols-4 gap-4 m-4 justify-around'>
          <div>
            <h1 className='font-semibold'>Booking Id</h1>
            <h4 className='text-gray-500'>{booking?.bookingId}</h4>
          </div>
          <div>
            <h1 className='font-semibold'>Booking Date</h1>
            <h4 className='text-gray-500'>{booking?.createdAt}</h4>
          </div>
          <div>
            <h1 className='font-semibold'>Bookig Status</h1>
            {cancelled ? (
              <h4>{booking?.status}</h4>
            ) : (
              <select
                onChange={(e) => handleStatus(e.target.value)}
                className='px- py- w-fit border-2 border-gray-300 focus:outline-none'
                name='category'
                id='category'
                defaultValue={booking?.status}
              >
                <option value={booking?.status}>{booking?.status}</option>
                <option className={`${booking?.status == 'active' ? 'hidden' : ''}`} value='active'>
                  active
                </option>
                <option className={`${booking?.status == 'booked' ? 'hidden' : ''}`} value='booked'>
                  booked
                </option>
                <option className={`${booking?.status == 'accepted' ? 'hidden' : ''}`} value='accepted'>
                  accepted
                </option>
                <option className={`${booking?.status == 'expired' ? 'hidden' : ''}`} value='expired'>
                  expired
                </option>
                <option className={`${booking?.status == 'cancelled' ? 'hidden' : ''}`} value='cancelled'>
                  cancelled
                </option>
              </select>
            )}
          </div>
          <div>
            <h1 className='font-semibold'>User Name</h1>
            <h4 className='text-gray-500'>{booking?.userName}</h4>
          </div>
          <div>
            <h1 className='font-semibold'>User Email</h1>
            <h4 className='text-gray-500'>{booking?.userEmail}</h4>
          </div>
          <div>
            <h1 className='font-semibold'>Hotel Name</h1>
            <h4 className='text-gray-500'>{booking?.hotelName}</h4>
          </div>
          <div>
            <h1 className='font-semibold'>Hotel Id</h1>
            <h4 className='text-gray-500'>{booking?.hotelId}</h4>
          </div>
          <div>
            <h1 className='font-semibold'>Hotel Email</h1>
            <h4 className='text-gray-500'>{booking?.hotelEmail}</h4>
          </div>
          <div>
            <h1 className='font-semibold'>Hotel Place</h1>
            <h4 className='text-gray-500'>Mavoor Road</h4>
          </div>
          <div>
            <h1 className='font-semibold'>Hotel City</h1>
            <h4 className='text-gray-500'>Calicut</h4>
          </div>
          <div>
            <h1 className='font-semibold'>Checkin Date</h1>
            <h4 className='text-gray-500'>{booking?.checkInDate}</h4>
          </div>
          <div>
            <h1 className='font-semibold'>Checkout Date</h1>
            <h4 className='text-gray-500'>{booking?.checkOutDate}</h4>
          </div>
          <div>
            <h1 className='font-semibold'>Total Stay Days</h1>
            <h4 className='text-gray-500'>{booking?.totalStayDays}</h4>
          </div>
          <div>
            <h1 className='font-semibold'>Total Rooms</h1>
            <h4 className='text-gray-500'>{booking?.totalRooms}</h4>
          </div>
          <div>
            <h1 className='font-semibold'>Single Room Price</h1>
            <h4 className='text-gray-500'>{booking?.singleRoomPrice}</h4>
          </div>
          <div>
            <h1 className='font-semibold'>Total Price</h1>
            <h4 className='text-gray-500'>{booking?.totalPrice}</h4>
          </div>
          <div>
            <h1 className='font-semibold'>online Payment</h1>
            <h4 className='text-gray-500'>{booking?.paidByCash}</h4>
          </div>
          <div>
            <h1 className='font-semibold'>Wallet Payment</h1>
            <h4 className='text-gray-500'>{booking?.paidByWallet}</h4>
          </div>
          {cancelled && (
            <>
              <div className='border bg-gray-200 p-2 col-span-3 '>
                <h1 className='font-semibold'>Reason for cancellation</h1>
                <h4 className='text-gray-500'>{booking?.message}</h4>
              </div>
              <div className=''>
                <h1 className='font-semibold'>Cancelled By</h1>
                <h4 className='text-gray-500'>{booking?.cancelledBy}</h4>
              </div>
            </>
          )}
        </div>
      )}
      {editStatus && (
        <div className='right-0 left-0 mx-auto flex flex-col a  items-center justify-center absolute'>
          <div className='bg-teal-900 text-white  flex flex-col   w-96 h-auto p-10 rounded-md items-center justify-center'>
            <h3 className='my-4 text-md'>Reason for cancellation</h3>
            <textarea
              type='text'
              defaultValue={inputValue}
              className='text-gray-500 font-sm w-full text-center h-8'
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />

            <div className='flex my-2 gap-3 float-right'>
              <button
                className='hover:underline font-semibold'
                onClick={() => {
                  if (!inputValue) return toast.error('write a reason for cancellation');
                  const data = {
                    value: 'cancelled',
                    id: booking._id,
                    reason: inputValue,
                    cancelledBy: 'Admin',
                  };
                  adminApi
                    .put('/change-status', { data })
                    .then((response) => {
                      toast.success(response.data.message);
                    })
                    .catch((error) => {
                      toast.error(error.response.data.message);
                    });

                  setEditStatus(false);
                  setInputValue('');
                }}
              >
                Submit
              </button>
              <button className='hover:underline font-semibold' onClick={() => setEditStatus(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleBookingData;
