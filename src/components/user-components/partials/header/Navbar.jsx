import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-hot-toast';
import { setLocation, setHotelData, setIsDataOver } from '../../../../reduxToolkit/searchSlice';
import { userApi } from '../../../../api/userApi';
import RoomSelection from './RoomSelection';
import MyCalendar from './Calender';
import profile from '../../../../../public/images/profile.png';
import './Navbar.css';
import { FiSearch } from 'react-icons/fi';
import { connect } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.search);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openRoomDiv, setOpenRoomDiv] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const room = searchData.roomCounts;
  let guest = [...searchData.guestCounts];
  guest = guest?.map((element) => parseInt(element));
  const sum = guest?.reduce((acc, curr) => {
    return acc + parseInt(curr);
  }, 0);
  const calenderRef = useRef(null);
  const divRef = useRef(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
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

  function handleClickOutside(event) {
    if (isMobile) {
      setOpenCalendar(false);
      return;
    }
    if (calenderRef.current && !calenderRef.current.contains(event.target)) {
      setOpenCalendar(false);
    }

    if (divRef.current && !divRef.current.contains(event.target)) {
      setOpenRoomDiv(false);
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
      dispatch(setIsDataOver(response.data.isDataOver));
      navigate('/display-rooms');
    } catch (err) {
      toast.error('something went wrong');
    }
  };

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleRoomDiv = (e) => {
    e.stopPropagation();

    setOpenRoomDiv(!openRoomDiv);
    setOpenCalendar(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className='navbar bg-white z-50 w-full md:pl-6 md:fixed '>
      <div onClick={() => navigate('/')} className='cursor-pointer  '>
        {/* <h1 className='font-bold cursor-default text-orange-700' onClick={() => navigate('/')}>
          Roomie.com
        </h1> */}
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5300 1024' width='130' height='30'>
          <path
            className='svg-path'
            fill='#2a2730'
            d='M261 756.4c-102.4 0-162-109-162-237.8 0-132 49.6-221.3 145.4-221.3 102.4 0 162 109 162 237.8 0 132.3-46.3 221.4-145.4 221.4zm-3.3-512C115.7 244.4 0 360 0 538.4c0 158.6 99 271 251 271 138.8 0 257.7-115.7 257.7-294-3.3-155.3-99-271-251-271zm2556.6 459.2V413c0-119-52.8-168.6-145.3-168.6-86 0-148.6 53-198.2 102.4V244.4h-26.4l-138.7 53v23l72.6 36.3V707c0 46-33 52.7-79.3 59.3v36.4h254.4v-36.4c-46.3-6.6-79.3-10-79.3-59.4V376.5c39.8-29.8 99.2-53 152-53 66 0 96 26.5 96 99.2v284c0 46.3-33.2 53-79.4 59.5v36.4H2897v-36.4c-46.3-10-82.7-13.2-82.7-62.7zM3138 294c86 0 129 62.7 129 161.8h-271c6.6-85.8 59.5-161.8 142-161.8zm39.7 439.3c-115.6 0-188.3-92.5-188.3-224.6H3356v-33c0-135.5-69.3-228-208-228-142 0-247.8 119-247.8 300.6 0 148.7 89.2 264.3 238 264.3 115.5 0 191.5-66 214.6-158.6l-16.5-10c-33 49.7-79.3 89.3-158.6 89.3zM1367.5 294c86 0 129 62.7 129 161.8h-271c10-85.8 62.8-161.8 142-161.8zm43 439.3c-115.6 0-188.3-92.5-188.3-224.6H1589v-33c0-135.5-69.5-228-208.3-228-142 0-247.7 119-247.7 300.6 0 148.7 89.2 264.3 237.8 264.3 115.7 0 191.6-66 214.7-158.6l-16.5-10c-33 49.7-82.5 89.3-158.5 89.3zm753-29.7V244.4h-23l-26.4 13.3h-287.3V208c0-105.6 49.5-158.5 109-158.5 49.5 0 69.4 20 69.4 72.7v26.4h59.5c19.8-10 36.3-33 36.3-56 0-53-62.7-79.4-145.3-79.4-135.4 0-221.3 92.5-221.3 221.3v13.2l-76 26.5v33h76v396.4c0 46.2-33 52.8-79.3 59.4v36.4h254.3V763c-46.3-6.6-79.3-10-79.3-59.4V307.2h241v396.4c0 46.2-33 52.8-79.2 59.4v36.4h254.4V763c-49.6-6.6-82.6-10-82.6-59.4zM5087 254.3v36.4c52.8 6.6 72.6 13.2 72.6 36.3 0 6.6-3.3 13.2-6.6 26.4L5027.5 687 4892 353.5c-6.5-13.2-6.5-19.8-6.5-26.4 0-23 19.8-29.7 72.6-36.3v-36.4h-241v36.4c46.3 16.5 49.6 19.8 59.5 39.6l204.8 472.4-20 52.8c-19.7 56.2-46 69.4-112.2 69.4h-52.7v46c16.5 23.3 46.2 36.5 79.3 36.5 62.7 0 95.8-43 119-109L5222.3 327c6.6-23 13.2-23 59.5-39.6v-33h-195zm-525.2 436c-43 33-79.3 46.3-125.6 46.3-52.8 0-82.5-33-82.5-92.5 0-39.5 23-69.2 62.7-82.5l145.4-56v185zm138.7 53c-29.7 0-46.3-23.2-46.3-69.4 0-43 3.3-221.5 3.3-254.5 0-112.3-59.4-171.8-178.3-171.8-112.3 0-195 49.6-195 132.2 0 23 6.7 39.5 23.2 56l76-10c-6.6-19.7-6.6-36.2-6.6-52.7 0-53 29.7-76 86-76 79 0 102.3 52.8 102.3 115.6v49.5L4403.3 522c-66 23-142 56-142 152 0 75.8 43 138.6 135.4 138.6 76 0 135.4-53 171.8-92.5 10 56.3 36.3 92.6 85.8 92.6 36.4 0 69.4-13.2 102.4-49.6l-6.6-23c-16.5 0-39.6 3.2-49.5 3.2zM1047 703.5V413c0-119-52.7-168.6-145.2-168.6-86 0-148.7 53-198.2 102.4V244.4h-26.4l-142 53v23l72.6 36.3V707c0 46-33 52.7-79.3 59.3v36.4H783v-36.4c-46.4-6.6-79.4-10-79.4-59.4V376.5c39.6-29.8 99-53 152-53 66 0 95.7 26.5 95.7 99.2v284c0 46.3-33 53-79.2 59.5v36.4h254.4v-36.4c-46.2-10-79.3-13.2-79.3-62.7zm3154.7 19.8c-26.4 13.2-62.8 23-95.8 23-56.2 0-82.7-19.7-82.7-75.8V320.4H4182V271h-158.7v-89.3c0-43-13.2-76-33-105.7-33-49.6-95.8-76-162-72.7-66-3.3-125.4 26.4-161.7 72.7-19.8 29.7-29.7 62.7-33 105.7v10c3.3 26.3 6.6 46 13.2 59.3h-26.5c-109 0-178.3 66-178.3 155.3 0 95.8 59.4 132 152 162S3736 621 3736 687c0 53-39.7 86-105.8 86-85.8 0-135.4-53-155.2-142h-39.6l6.6 138.7c49.5 39.6 119 49.5 188.2 49.5 119 0 191.6-69.4 191.6-162 0-105.6-69.3-135.3-171.7-168.3-79.2-26.5-122.2-56.3-122.2-112.4 0-46.3 33-82.6 89.2-82.6 72.7 0 119 43 135.5 125.5h39.6v-142s-9.8-3.3-23-6.6l-23-10c-3.4-3.3-13.4-10-13.4-10-23-19.8-36.3-46.2-36.3-82.5v-33c6.6-49.6 49.6-89.3 105.7-96h46.3c56 6.7 99 46.4 105.7 96 0 9.8 3.3 23 0 33-3.3 33-16.6 62.7-36.4 82.5 0 0-10 6.6-13.2 10-19.8 13.2-43 13.2-46.2 16.5v43h62.7v370c0 89 52.8 122 122 122s122.4-26.3 158.7-66v-23z'
            fillOpacity='1'
          />
        </svg>
      </div>
      {!isMobile && (
        <div className='navbar-links cursor-default '>
          <div className=''>
            <input
              className='searchInput rounded-l-3xl   flex items-center justify-center text-center w-60 font-normal text-sm tracking-wider text-md fontFm '
              placeholder={'ex: trivandrum'}
              type='text'
              defaultValue={searchData?.location}
              onChange={(e) => {
                localStorage.setItem('location', e.target.value);
                dispatch(setLocation(e.target.value));
              }}
            />
          </div>
          <div
            className='border flex items-center justify-center cursor-pointer border-l-0 border-gray-300 w-60 h-10 p-2'
            ref={calenderRef}
            onClick={() => {
              setOpenCalendar(true);
              setOpenRoomDiv(false);
            }}
          >
            <div className='flex text-xs text-center fontFm'>
              {searchData?.checkInDate} - {searchData?.checkOutDate}
            </div>
            {/* <MyCalendar /> */}
            <div className='text-xs mt-10'>{openCalendar && <MyCalendar />}</div>
          </div>
          <div
            ref={divRef}
            className=' select-none cursor-pointer md:h-10 md:w-48 border px-2 py-1 border-gray-300 flex flex-col gap-0 items-center justify-center border-l-0'
            onClick={handleRoomDiv}
          >
            <p className=' text-sm fontFm'>
              {room} Room, {sum} Guests
            </p>
            {openRoomDiv && (
              <div className=' w-full '>
                <RoomSelection />
              </div>
            )}
          </div>

          <div className=''>
            <button
              className='bg-cyan-600 h-10 w-12 text-sm p-2 hover:bg-cyan-800 duration-300 text-gray-100 px-3 py-1 rounded-r-3xl'
              onClick={handleSubmit}
            >
              <FiSearch style={{ fontSize: '20px', color: 'white' }} />
            </button>
          </div>
        </div>
      )}

      <div className='navbar-icons '>
        {!isMobile && (
          <div className='flex gap-1 mr-6 text-sm bg-gray-30 min-w-fit h-10'>
            <button
              className='hover:text-cyan-700 fontfm'
              onClick={() => {
                navigate('/hotel-register-form');
              }}
            >
              List your property
            </button>{' '}
            <div className='horizontalLine border-r h-2/4 my-auto mx-1 border-gray-300'></div>
            <button
              className='hover:text-cyan-700 fontfm'
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
            >
              Logout
            </button>
          </div>
        )}
        {isMobile ? (
          <div className='flex mx-2 '>
            <div className='flex-1 p-4 '></div>
            <div
              className={`fixed top-0 right-0 bottom-0 w-64 focus:outline-none bg-white shadow-lg  transition-all duration-300 ${
                sidebarVisible ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className='flex flex-col   h-full my-16'>
                <p
                  className='p-4 focus:text-black duration-300 transition-all hover:text-black text-cyan-900 border-b hover:bg-gray-200 font-semibold text-sm tracking-wider'
                  onClick={() => navigate('/profile')}
                >
                  PROFILE
                </p>
                <p
                  className='p-4 focus:text-black duration-300 transition-all hover:text-black text-cyan-900 border-b hover:bg-gray-200 font-semibold text-sm tracking-wider'
                  onClick={() => navigate('/profile')}
                >
                  BOOKINGS
                </p>
                <p
                  className='p-4 focus:text-black duration-300 transition-all hover:text-black text-cyan-900 border-b hover:bg-gray-200 font-semibold text-sm tracking-wider'
                  onClick={() => navigate('/profile')}
                >
                  WALLET
                </p>
                <p
                  className='p-4 focus:text-black duration-300 transition-all hover:text-black text-cyan-900 border-b hover:bg-gray-200 font-semibold text-sm tracking-wider'
                  onClick={() => navigate('/hotel-register-form')}
                >
                  LIST PROPERTY
                </p>
                <p
                  className='p-4 focus:text-black duration-300 transition-all hover:text-black text-cyan-900 border-b hover:bg-gray-200 font-semibold text-sm tracking-wider'
                  onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                  }}
                >
                  LOGOUT
                </p>
              </div>
            </div>
            <div
              className={`${
                sidebarVisible
                  ? 'fixed top-4 right-4 w-8 h-8 focus:outline-none  rounded-full flex justify-center items-center '
                  : 'absolute top-4 right-4 w-8 h-8 focus:outline-none  rounded-full flex justify-center items-center '
              }`}
              // className='absolute top-4 right-4 w-8 h-8 focus:outline-none  rounded-full flex justify-center items-center cursor-pointer'
              onClick={handleSidebarToggle}
            >
              <img loading='lazy' src={profile} alt='nn' />
            </div>
          </div>
        ) : (
          <div
            className=' top-4 right-0 w-8 h-8 focus:outline-none  rounded-full flex justify-end items-center cursor-pointer z-'
            onClick={() => navigate('/profile')}
          >
            <img loading='lazy' src={profile} alt='nn' />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
