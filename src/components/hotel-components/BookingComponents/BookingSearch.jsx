import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { hotelApi } from '../../../api/hotelApi';
import { toast } from 'react-hot-toast';

export default function BookingSearch(props) {
  // eslint-disable-next-line react/prop-types
  const [status, setStastus] = useState(props.value.status);
  const [editDiv, setEditDiv] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setData(props.value);
  }, [props]);

  const handleStatus = (value) => {
    if (value == status) return;
    const data = {
      value,
      // eslint-disable-next-line react/prop-types
      id: props.value._id,
    };
    hotelApi
      .put('/change-status', { data })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div>
      <div className='bg-gray-200 w-full flex justify-around p-2 hover:shadow-md hover:bg-gray-300'>
        <h4>{data?.bookingId}</h4>
        <h4>{data?.user.name} </h4>
        <h4 onClick={() => setEditDiv(!editDiv)}>
          <FiEdit />
        </h4>
      </div>
      {editDiv && (
        <div className='grid grid-cols-3 gap-3 p-2'>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>Booking Id</h4>
            <p> {data?.bookingId} </p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>user name</h4>
            <p>{data?.user.name}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>checkIn date</h4>
            <p>{data?.checkInDate}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>checkout date</h4>
            <p>{data?.checkOutDate}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>total rooms</h4>
            <p>{data?.totalRooms}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>total stay days</h4>
            <p>{data?.totalStayDays}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>allowed Rooms</h4>
            <p>content</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>total guests</h4>
            <p>{data?.totalGuest}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>total sty days</h4>
            <p>{data?.totalStayDays}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>price of single room </h4>
            <p>{data?.singleRoomPrice}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>total price</h4>
            <p>{data?.totalPrice}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>online payment </h4>
            <p>{data?.paidByCash}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>wallet payment </h4>
            <p>{data?.paidByWallet}</p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold'>status</h4>

            <select
              onChange={(e) => handleStatus(e.target.value)}
              className='px- py- w-fit border-2 border-gray-300 focus:outline-none'
              name='category'
              id='category'
            >
              <option value={status}>{status}</option>
              <option className={`${status == 'active' ? 'hidden' : ''}`} value='active'>
                active
              </option>
              <option className={`${status == 'pending' ? 'hidden' : ''}`} value='pending'>
                pending
              </option>
              <option className={`${status == 'accepted' ? 'hidden' : ''}`} value='accepted'>
                accepted
              </option>
              <option className={`${status == 'expired' ? 'hidden' : ''}`} value='expired'>
                expired
              </option>
            </select>
          </div>
          <h4 className='font-semibold'>Done</h4>
        </div>
      )}
    </div>
  );
}
