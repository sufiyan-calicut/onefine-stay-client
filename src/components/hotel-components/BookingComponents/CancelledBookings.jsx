import React, { useEffect, useState } from 'react';
import { hotelApi } from '../../../api/hotelApi';
import { toast } from 'react-hot-toast';

function CancelledBookings() {
  const [data, setData] = useState();
  useEffect(()=>{
    hotelApi.get('/fetch-cancelled-bookings').then((response)=>{
      setData(response.data.bookings);
    }).catch((error)=>{
      toast.error(error.response.error.message);
    })
  },[])
  return (
    <div className='bg-gray-50 h-full  flex justify-center '>
      <div className='  h-full w-2/4  flex flex-col my-10'>
        {data?.length == 0 ? (
          <p className='text-gray-500 tracking-wider text-xl'>You Don't Have Cancelled Requests</p>
        ) : (
          data?.map((booking, i) => {
            return (
              <div
                key={i}
                className='h-auto cursor-pointer p-10 w-full flex flex-col gap-2 text-s font-semibold  bg-white shadow-md border hover:shadow-lg hover:border-gray-300  hover:text-gray-700 duration-700'
              >
                <div className=' text-gray-500 grid   grid-cols-3  gap-3  justify-around cursor-pointer w-fit   '>
                  <h1>
                    Booking ID : <span className='font-normal text-black '>{booking?.bookingId}</span>
                  </h1>
                  <h4>
                    Cancelled Date : <span className='font-normal text-black'>{booking?.actionDate}</span>{' '}
                  </h4>
                  <h4>
                    Cancelled By: <span className='font-normal text-black'>{booking?.cancelledBy}</span>{' '}
                  </h4>

                </div>
                <div className=' flex flex-col justify-start mt-2 text-sm '>
                  <h1 className='font-semibold w-full tex-gray-400 text-md'>Reason for cancellation :</h1>
                  <p className='text-sm text-gray-500 '>{booking.message}</p>

                </div>

                {/* {popup && (
                  <div className='border border-b-0 px-10 bg-gray-50 gap-2 flex flex-col justify-center h-44 w-full'>
                    <div className=' flex justify-end'>
                      <button onClick={() => setPopup(false)} className='border border-gray-50 hover:border-gray-300'>
                        <AiOutlineClose />
                      </button>
                    </div>
                    <div>
                      <h1 className='left-0  font-normal'>Write a reason for this cancellation</h1>
                      <textarea className='h-12 p-1 font-normal text-sm left-0 right-0 mx-auto w-full border border-gray-300 ' />
                    </div>

                    <div className=' flex justify-end'>
                      <button className='hover:underline text-blue-600'>Done</button>
                    </div>
                  </div>
                )} */}
              </div>
            );
            // return <SingleRequest key={i} value={request} />;
          })
        )}
      </div>
    </div>
  );
}

export default CancelledBookings;
