import React, { useEffect, useRef, useState } from 'react';
import myImage from '../../../../../public/images/coverpic.jpg';
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
            <h1 className='sm:text-xl md:text-4xl    mb-4 welcome-text '>Welcome to Roomie.com</h1>
            <p className=' text-sm md:text-lg text-sky-300 px-16 md:p-1'>
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
            <h1 className='text-md font-sans font-thi    mb-4 welcome-text'>
              Explore with Confidence: We Assure Your Stay
            </h1>
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
            <h1 className='text-md font-sans font-thi    mb-4 welcome-text'>
              Worldwide Accommodation Booking at Your Fingertips
            </h1>

            <p className=' text-sm md:text-lg text-sky-300 px-16 md:p-1'>
              where we guarantee a seamless booking experience for all your accommodation needs, no matter where you are
              in the world. With our extensive network of trusted partners and cutting-edge technology, we assure you of
              a comfortable and hassle-free stay at the best rates possible. Book with us today and enjoy the peace of
              mind that comes with knowing your travel arrangements are in good hands
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
