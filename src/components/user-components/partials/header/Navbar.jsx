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
    <nav className='navbar z-50 w-46 md:w-full md:pl-10 md:fixed sm:border-0 md:border-b '>
      <div className='navbar-logo '>
        <h1 className='font-bold cursor-default text-orange-700' onClick={() => navigate('/')}>
          Roomie.com
        </h1>
      </div>
      {!isMobile && (
        <div className='navbar-links cursor-defaul'>
          <div className=''>
            <input
              className='searchInput  flex items-center justify-center text-center w-60 font-normal text-sm tracking-wider text-md '
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
            <div className='flex text-xs'>
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
            <p className=' text-sm'>
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
              className='bg-cyan-600 h-10 text-sm hover:bg-cyan-800 duration-300 text-gray-100 px-3 py-1 rounded-r-sm'
              onClick={handleSubmit}
            >
              search
            </button>
          </div>
        </div>
      )}

      <div className='navbar-icons'>
        {!isMobile && (
          <div className='flex gap-1 mr-10 text-sm'>
            <button
              className='hover:text-cyan-700'
              onClick={() => {
                navigate('/hotel-register-form');
              }}
            >
              List your property
            </button>{' '}
            |
            <button
              className='hover:text-cyan-700'
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
          <div className='flex mx-2'>
            <div className='flex-1 p-4'></div>
            <div
              className={`fixed top-0 right-0 bottom-0 w-64 focus:outline-none bg-sky-800 transition-all duration-300 ${
                sidebarVisible ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className='flex flex-col justify-cente items-cente  h-full my-16'>
                <p
                  className='p-4 focus:text-black duration-300 transition-all hover:text-black text-gray-200 hover:bg-gray-200 font-semibold text-sm tracking-wider'
                  onClick={() => navigate('/profile')}
                >
                  PROFILE
                </p>
                <p
                  className='p-4 focus:text-black duration-300 transition-all hover:text-black text-gray-200 hover:bg-gray-200 font-semibold text-sm tracking-wider'
                  onClick={() => navigate('/profile')}
                >
                  BOOKINGS
                </p>
                <p
                  className='p-4 focus:text-black duration-300 transition-all hover:text-black text-gray-200 hover:bg-gray-200 font-semibold text-sm tracking-wider'
                  onClick={() => navigate('/profile')}
                >
                  WALLET
                </p>
                <p
                  className='p-4 focus:text-black duration-300 transition-all hover:text-black text-gray-200 hover:bg-gray-200 font-semibold text-sm tracking-wider'
                  onClick={() => navigate('/hotel-register-form')}
                >
                  LIST PROPERTY
                </p>
                <p
                  className='p-4 focus:text-black duration-300 transition-all hover:text-black text-gray-200 hover:bg-gray-200 font-semibold text-sm tracking-wider'
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
                  ? 'fixed top-4 right-4 w-8 h-8 focus:outline-none  rounded-full flex justify-center items-center cursor-pointer z-'
                  : ' top-4 right-4 w-8 h-8 focus:outline-none  rounded-full flex justify-center items-center cursor-pointer z-'
              }`}
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
