import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { adminApi } from '../../../api/adminApi';
import { toast } from 'react-hot-toast';

function SearchResult(props) {
  const [editDiv, setEditDiv] = useState(false);
  const [booking, setBooking] = useState();
  const [cancelled, setCancelled] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    setCancelled(false);
    // eslint-disable-next-line react/prop-types
    setBooking(props.value);
    // setStatus(booking?.status);
    setEditDiv(false);
    // eslint-disable-next-line react/prop-types
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
        id: booking?._id,
      };
      adminApi
        .put('/change-status', { data })
        .then((response) => {
          // setBooking({});
          setBooking({
            ...data,
            status: value,
          });
          toast.success(response.data.message);
        })
        .catch((error) => {

          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <>
      <div className='bg-gray-200 w-full flex justify-around p-2 hover:shadow-md hover:bg-gray-300'>
        <h4>{booking?.bookingId}</h4>

        <h4>{booking?.userName}</h4>
        <h4 onClick={() => setEditDiv(!editDiv)}>
          <FiEdit />
        </h4>
      </div>
      {editDiv && (
        <div className='grid grid-cols-3 gap-3 p-2'>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>Booking Id</h4>
            <p> {booking?.bookingId} </p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>user name</h4>
            <p>{booking?.userName}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>user email</h4>
            <p>{booking?.userEmail}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>Hotel Id</h4>
            <p>{booking?.hotelId}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>Hotel name</h4>
            <p>{booking?.hotelName}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>Hotel email</h4>
            <p>{booking?.hotelEmail}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>hotel place</h4>
            <p>{booking?.hotelPlace}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>Hotel City</h4>
            <p>{booking?.hotelCity}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>checkIn date</h4>
            <p>{booking?.checkInDate}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>checkout date</h4>
            <p>{booking?.checkOutDate}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>total rooms</h4>
            <p>{booking?.totalRooms}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>total stay days</h4>
            <p>{booking?.totalStayDays}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>allowed Rooms</h4>
            <p>content</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>total guests</h4>
            <p>{booking?.totalGuest}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>total sty days</h4>
            <p>{booking?.totalStayDays}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>price of single room </h4>
            <p>{booking?.singleRoomPrice}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>total price</h4>
            <p>{booking?.totalPrice}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>online payment</h4>
            <p>{booking?.paidByCash}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>wallet payment</h4>
            <p>{booking?.paidByWallet}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>Bookig Status</h4>
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
        <div className='left-0 top-0 bottom-0 right-0 m-auto  flex flex-col a  items-center justify-center absolute'>
          <div className='bg-teal-900 text-white  flex flex-col opacity-95   w-2/4 h-2/4 p-10 rounded-md items-center justify-center'>
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
    </>
  );
}

export default SearchResult;
