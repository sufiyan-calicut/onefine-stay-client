import React, { useEffect, useRef, useState } from 'react';
// import myImage from '../../../../../public/images/coverpic.jpg';
import myImage from '../../../../../public/images/Hotel Check-in.jfif';
import location from '../../../../../public/images/map.png';
import explore from '../../../../../public/images/explore.png';
import './HomeMain.css';
import { useDispatch, useSelector } from 'react-redux';
import RoomSelection from '../../partials/header/RoomSelection';
import MyCalendar from '../../partials/header/Calender';
import { setHotelData, setLocation } from '../../../../reduxToolkit/searchSlice';
import { toast } from 'react-hot-toast';
import { userApi } from '../../../../api/userApi';
import { useNavigate } from 'react-router-dom';

function HomeMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const divRef = useRef(null);
  const calanderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openRoomDiv, setOpenRoomDiv] = useState(false);
  const [openCalenderDiv, setOpenCalenderDiv] = useState(false);
  const searchData = useSelector((state) => state.search);
  const room = searchData.roomCounts;
  let guest = [...searchData.guestCounts];
  guest = guest?.map((element) => parseInt(element));
  const sum = guest?.reduce((acc, curr) => {
    return acc + parseInt(curr);
  }, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  let count = 0;
  function handleClickOutside(event) {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setOpenRoomDiv(false);
    }
    if (calanderRef.current && !calanderRef.current.contains(event.target)) {
      count++;
    }
    if (count == 2) {
      count = 0;
      setOpenCalenderDiv(false);
    }
  }

  const handleSubmit = async () => {
    if (!searchData.location) {
      return toast.error('Give your location in the search bar');
    }
    try {
      const response = await userApi.post('/fetch-search-data', searchData);
      if (response.data.data.length === 0) {
        return toast('No data found', { icon: '👏' });
      }
      dispatch(setHotelData(response.data.data));
      navigate('/display-rooms');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {isMobile && (
        <div className=' flex flex-col  items-center justify-center mt-20'>
          <div className='bg-white h-auto w-fit'>
            <input
              className='w-full text-center text-xs text-gray-500'
              defaultValue={searchData?.location}
              placeholder={'ex: Trivandrum'}
              type='text'
              onChange={(e) => dispatch(setLocation(e.target.value))}
            />
            <div className='flex '>
              <div
                className='cursor-pointer flex h-10 items-center justify-center border-x border-gray-400 w-40 text-xs tracking-tighter text-center p-1'
                placeholder={''}
                type='text'
                ref={calanderRef}
                onClick={() => {
                  setOpenRoomDiv(false);
                  setOpenCalenderDiv(!openCalenderDiv);
                }}
              >
                {' '}
                {searchData?.checkInDate} - {searchData?.checkOutDate}
              </div>
              <div
                ref={divRef}
                className='cursor-pointer flex h-10 items-center justify-center border-x border-gray-400 w-40 text-xs tracking-tighter text-center'
                placeholder={''}
                type='text'
                onClick={() => {
                  setOpenRoomDiv(!openRoomDiv);
                  setOpenCalenderDiv(false);
                }}
              >
                {room} Room, {sum} Guests
              </div>
            </div>
            <div className=' mx-8'>
              {openRoomDiv && (
                <div className='text-xs'>
                  <RoomSelection />
                </div>
              )}
            </div>
            <div className=' mx-8'>
              {openCalenderDiv && (
                <div className='text-xs'>
                  <MyCalendar />
                </div>
              )}
            </div>
            <button
              className='bg-cyan-500 w-full py-2 hover:bg-cyan-800 text-gray-50 hover:text-gray-50 duration-300 '
              onClick={handleSubmit}
            >
              search
            </button>
          </div>
        </div>
      )}
      <div className='mt-16 md:mx-20'>
        <div className='flex flex-col md:flex-row items-center justify-center h- md:justify-between bg-white cover-div  '>
          <div className='text-center md:text-left mb-10 md:mb-0  '>
            <h3 className='sm:text-xl md:text-3xl    mb-4 welcome-text '>
              Welcome to{' '}
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5300 1024' width='180' height='30'>
                <path
                  className='svg-path'
                  fill='#2a2730'
                  d='M261 756.4c-102.4 0-162-109-162-237.8 0-132 49.6-221.3 145.4-221.3 102.4 0 162 109 162 237.8 0 132.3-46.3 221.4-145.4 221.4zm-3.3-512C115.7 244.4 0 360 0 538.4c0 158.6 99 271 251 271 138.8 0 257.7-115.7 257.7-294-3.3-155.3-99-271-251-271zm2556.6 459.2V413c0-119-52.8-168.6-145.3-168.6-86 0-148.6 53-198.2 102.4V244.4h-26.4l-138.7 53v23l72.6 36.3V707c0 46-33 52.7-79.3 59.3v36.4h254.4v-36.4c-46.3-6.6-79.3-10-79.3-59.4V376.5c39.8-29.8 99.2-53 152-53 66 0 96 26.5 96 99.2v284c0 46.3-33.2 53-79.4 59.5v36.4H2897v-36.4c-46.3-10-82.7-13.2-82.7-62.7zM3138 294c86 0 129 62.7 129 161.8h-271c6.6-85.8 59.5-161.8 142-161.8zm39.7 439.3c-115.6 0-188.3-92.5-188.3-224.6H3356v-33c0-135.5-69.3-228-208-228-142 0-247.8 119-247.8 300.6 0 148.7 89.2 264.3 238 264.3 115.5 0 191.5-66 214.6-158.6l-16.5-10c-33 49.7-79.3 89.3-158.6 89.3zM1367.5 294c86 0 129 62.7 129 161.8h-271c10-85.8 62.8-161.8 142-161.8zm43 439.3c-115.6 0-188.3-92.5-188.3-224.6H1589v-33c0-135.5-69.5-228-208.3-228-142 0-247.7 119-247.7 300.6 0 148.7 89.2 264.3 237.8 264.3 115.7 0 191.6-66 214.7-158.6l-16.5-10c-33 49.7-82.5 89.3-158.5 89.3zm753-29.7V244.4h-23l-26.4 13.3h-287.3V208c0-105.6 49.5-158.5 109-158.5 49.5 0 69.4 20 69.4 72.7v26.4h59.5c19.8-10 36.3-33 36.3-56 0-53-62.7-79.4-145.3-79.4-135.4 0-221.3 92.5-221.3 221.3v13.2l-76 26.5v33h76v396.4c0 46.2-33 52.8-79.3 59.4v36.4h254.3V763c-46.3-6.6-79.3-10-79.3-59.4V307.2h241v396.4c0 46.2-33 52.8-79.2 59.4v36.4h254.4V763c-49.6-6.6-82.6-10-82.6-59.4zM5087 254.3v36.4c52.8 6.6 72.6 13.2 72.6 36.3 0 6.6-3.3 13.2-6.6 26.4L5027.5 687 4892 353.5c-6.5-13.2-6.5-19.8-6.5-26.4 0-23 19.8-29.7 72.6-36.3v-36.4h-241v36.4c46.3 16.5 49.6 19.8 59.5 39.6l204.8 472.4-20 52.8c-19.7 56.2-46 69.4-112.2 69.4h-52.7v46c16.5 23.3 46.2 36.5 79.3 36.5 62.7 0 95.8-43 119-109L5222.3 327c6.6-23 13.2-23 59.5-39.6v-33h-195zm-525.2 436c-43 33-79.3 46.3-125.6 46.3-52.8 0-82.5-33-82.5-92.5 0-39.5 23-69.2 62.7-82.5l145.4-56v185zm138.7 53c-29.7 0-46.3-23.2-46.3-69.4 0-43 3.3-221.5 3.3-254.5 0-112.3-59.4-171.8-178.3-171.8-112.3 0-195 49.6-195 132.2 0 23 6.7 39.5 23.2 56l76-10c-6.6-19.7-6.6-36.2-6.6-52.7 0-53 29.7-76 86-76 79 0 102.3 52.8 102.3 115.6v49.5L4403.3 522c-66 23-142 56-142 152 0 75.8 43 138.6 135.4 138.6 76 0 135.4-53 171.8-92.5 10 56.3 36.3 92.6 85.8 92.6 36.4 0 69.4-13.2 102.4-49.6l-6.6-23c-16.5 0-39.6 3.2-49.5 3.2zM1047 703.5V413c0-119-52.7-168.6-145.2-168.6-86 0-148.7 53-198.2 102.4V244.4h-26.4l-142 53v23l72.6 36.3V707c0 46-33 52.7-79.3 59.3v36.4H783v-36.4c-46.4-6.6-79.4-10-79.4-59.4V376.5c39.6-29.8 99-53 152-53 66 0 95.7 26.5 95.7 99.2v284c0 46.3-33 53-79.2 59.5v36.4h254.4v-36.4c-46.2-10-79.3-13.2-79.3-62.7zm3154.7 19.8c-26.4 13.2-62.8 23-95.8 23-56.2 0-82.7-19.7-82.7-75.8V320.4H4182V271h-158.7v-89.3c0-43-13.2-76-33-105.7-33-49.6-95.8-76-162-72.7-66-3.3-125.4 26.4-161.7 72.7-19.8 29.7-29.7 62.7-33 105.7v10c3.3 26.3 6.6 46 13.2 59.3h-26.5c-109 0-178.3 66-178.3 155.3 0 95.8 59.4 132 152 162S3736 621 3736 687c0 53-39.7 86-105.8 86-85.8 0-135.4-53-155.2-142h-39.6l6.6 138.7c49.5 39.6 119 49.5 188.2 49.5 119 0 191.6-69.4 191.6-162 0-105.6-69.3-135.3-171.7-168.3-79.2-26.5-122.2-56.3-122.2-112.4 0-46.3 33-82.6 89.2-82.6 72.7 0 119 43 135.5 125.5h39.6v-142s-9.8-3.3-23-6.6l-23-10c-3.4-3.3-13.4-10-13.4-10-23-19.8-36.3-46.2-36.3-82.5v-33c6.6-49.6 49.6-89.3 105.7-96h46.3c56 6.7 99 46.4 105.7 96 0 9.8 3.3 23 0 33-3.3 33-16.6 62.7-36.4 82.5 0 0-10 6.6-13.2 10-19.8 13.2-43 13.2-46.2 16.5v43h62.7v370c0 89 52.8 122 122 122s122.4-26.3 158.7-66v-23z'
                  fillOpacity='1'
                />
              </svg>
            </h3>
            <p className=' text-sm md:text-lg text-white px-16 md:p-1'>
              Thank you for choosing our home stay for your accommodation needs! We are delighted to have you as our
              guest and look forward to providing you with a comfortable and memorable stay.
            </p>
          </div>
          <div className='md:w-1/2 coverpic h- w-full object-cover '>
            <img loading='lazy' className='h-auto w-full object-cover coverpic bg-white ' src={myImage} />
          </div>
        </div>
      </div>
      <div className='mt-16 md:mx-20'>
        <div className='flex flex-col md:flex-row items-center justify-center h- md:justify-between bg-white cover-div  '>
          <div className='md:w-1/2 coverpic h- w-full object-cover '>
            <img loading='lazy' className='h-auto w-full object-cover coverpic bg-white ' src={explore} />
          </div>
          <div className='text-center md:text-left mb-10 md:mb-0  '>
            <h3 className='text-md  md:text-3xl  mb-4 welcome-text'>Explore with Confidence</h3>
            <p className=' text-sm md:text-lg text-sky-300 px-16 md:p-1'>
              Discover your dream destination and plan your vacation with ease using our hotel booking app. We assure a
              comfortable and enjoyable stay with our carefully curated selection of hotels and personalized service.
              Book now and create unforgettable memories.
            </p>
          </div>
        </div>
      </div>
      <div className='mb-16 md:mx-20  bg-yellow-500'>
        <div className='flex flex-col md:flex-row items-center justify-center h- md:justify-between bg-white cover-div  '>
          <div className='text-center md:text-left mb-10 md:mb-0  '>
            <h3 className='text-md  md:text-3xl    mb-4 welcome-text'>Booking at Your Fingertips</h3>

            <p className=' text-sm md:text-lg text-sky-300 px-16 md:p-1'>
              No matter where you are in the world. With our extensive network of trusted partners and cutting-edge
              technology, we assure you of a comfortable and hassle-free stay at the best rates possible. Book with us
              today and enjoy the peace of mind that comes with knowing your travel arrangements are in good hands
            </p>
          </div>
          <div className='md:w-1/2 coverpic h-fit w-full object-cover '>
            <img loading='lazy' className=' w-full object-cover coverpic bg-white ' src={location} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeMain;
