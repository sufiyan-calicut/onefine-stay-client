import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdCurrencyRupee } from 'react-icons/md';
import { userApi } from '../../../api/userApi';
// import { imgone } from '../../../../public/images/bg3 - Copy.jpg';
// import { imgtwo } from '../../../../public/images/3done.jpg';
import placeholder from '../../../../public/images/placeholder2.jpg';

function HotelData(props) {
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const searchData = useSelector((state) => state.search);
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setRoom(props.value);
  }, [searchData.hotelData]);

  const [position, setPosition] = useState(0);
  return (
    <div className=' tracking-wider md:h-auto     rounded-md p-10 mb-3 flex flex-col md:flex-row md:flex-wrap border-b border-gray-200'>
      <div className=' flex '>
        <div>
          {room?.images ? (
            <img
              src={room?.images[position]}
              className='w-64 h-52 object-cover rounded-sm mr-1 cursor-pointer mb-4 md:mb-0'
              loading='lazy'
            />
          ) : (
            <div className=' m-auto catalog-product w-64 h-52 object-cover rounded-sm mr-1 cursor-pointer mb-4 md:mb-0 '>
              <div className='border border-gray-200 p-4  w-full h-full left-0 right-0 mx-auto'>
                <div className='animate-pulse space-y-2 h-full'>
                  <div className='bg-gray-200 h-2/3 w-full'></div>
                  <div className='flex-1 space-y-2'>
                    <div className='h-6 bg-gray-200 w-full'></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className='flex flex-col items-center md:justify-center mb-4 md:mb-0  gap-2'>
            {room?.images ? (
              <>
                <img
                  src={room?.images[0]}
                  loading='lazy'
                  className='w-16 h-16 object-cover  mr-2 cursor-pointer'
                  onClick={() => setPosition(0)}
                />

                <img
                  src={room?.images[1]}
                  loading='lazy'
                  className='w-16 h-16 object-cover  mr-2 z-auto cursor-pointer h-'
                  onClick={() => setPosition(1)}
                />

                <img
                  src={room?.images[2]}
                  loading='lazy'
                  className='w-16 h-16 object-cover  mr-2 bg-gray cursor-pointer'
                  onClick={() => setPosition(2)}
                />
              </>
            ) : (
              <>
                <div className=' m-auto catalog-product w-16 h-16 object-cover  mr-2 cursor-pointer'>
                  <div className='border border-gray-200 p-1  w-full h-full '>
                    <div className='animate-pulse space-y-2 h-full'>
                      <div className='bg-gray-200 h-full w-full'></div>
                    </div>
                  </div>
                </div>
                <div className=' m-auto catalog-product w-16 h-16 object-cover  mr-2 cursor-pointer'>
                  <div className='border border-gray-200 p-1  w-full h-full '>
                    <div className='animate-pulse space-y-2 h-full'>
                      <div className='bg-gray-200 h-full w-full'></div>
                    </div>
                  </div>
                </div>
                <div className=' m-auto catalog-product w-16 h-16 object-cover  mr-2 cursor-pointer'>
                  <div className='border border-gray-200 p-1  w-full h-full '>
                    <div className='animate-pulse space-y-2 h-full'>
                      <div className='bg-gray-200 h-full w-full'></div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row w-3/5 ml-4 '>
        <div className='flex flex-col bg-blue-40 w-full'>
          <div className='mb-5'>
            <h1 className='text-xl text-cyan-900  mt-4'>{room?.hotelName}</h1>
            <h4 className='font-normal text-sm'>
              {room?.place} , {room?.city}
            </h4>
          </div>
          <div className='mb-5 flex bg-gray-5 w-fit flex-wrap'>
            {room?.amnities?.map((amnity, i) => {
              return (
                <p className='text-gray-400 text-sm mx-2' key={i}>
                  {amnity.toLowerCase()}
                </p>
              );
            })}
          </div>

          <div className='flex justify-between  '>
            <div>
              <p className='text-red-600 tracking-wider font-bold text-xl flex items-center'>
                <MdCurrencyRupee />
                {room?.price}
              </p>
              <p className='text-gray-600 tracking-tight text-sm'>per day per night</p>
            </div>

            <div className=' flex items-end bottom-0 mr-4'>
              <button
                className=' p-1 px-4 h-8 text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-gray-400 border text-sm'
                onClick={() => navigate('/single-room-details', { state: room._id })}
              >
                View Details
              </button>
              <button
                className=' p-1 ml-2 px-4 h-8 text-sm hover:shadow-md hover:bg-cyan-600 duration-300 bg-cyan-500 text-white'
                onClick={() => navigate('/single-room-details', { state: room._id })}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelData;
