import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../partials/header/Navbar';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setHotelData, setLocation, sortHotelPrice, updateAmnities } from '../../../reduxToolkit/searchSlice';
import RoomSelection from '../partials/header/RoomSelection';
import MyCalendar from '../partials/header/Calender';
import { toast } from 'react-hot-toast';
import { userApi } from '../../../api/userApi';
import { hideLoading, showLoading } from '../../../reduxToolkit/alertsReducer';

const MobileScreenDisplayRooms = () => {
  const calanderRef = useRef(null);
  const divRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterDiv, setFilterDiv] = useState(false);
  const [openRoomDiv, setOpenRoomDiv] = useState(false);
  const [openCalenderDiv, setOpenCalenderDiv] = useState(false);
  const searchData = useSelector((state) => state.search);
  const hotelData = searchData.hotelData;
  let [amnities, setAmnities] = useState({
    locker: false,
    dryer: false,
    internet: false,
    privateKitchen: false,
    privatePool: false,
    bathTub: false,
    antiTheftKey: false,
    laundry: false,
  });
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setAmnities((prevamnities) => ({ ...prevamnities, [name]: checked }));
  };

  const room = searchData.roomCounts;
  let guest = [...searchData.guestCounts];
  guest = guest?.map((element) => parseInt(element));
  const sum = guest?.reduce((acc, curr) => {
    return acc + parseInt(curr);
  }, 0);

  // const handleSubmit = async () => {
  //   if (!searchData.location) {
  //     return toast.error('Please Search by Place/Hotel');
  //   }
  //   try {
  //     const response = await userApi.post('/fetch-search-data', searchData);
  //     if (response.data.data.length === 0) {
  //       return toast('No data found', { icon: '👏' });
  //     }
  //     dispatch(setHotelData(response.data.data));
  //     setFilterDiv(!filterDiv);
  //   } catch (err) {

  //   }
  // };

  useEffect(() => {
    let finalAmnities = Object.keys(amnities).filter((key) => amnities[key]);
    dispatch(updateAmnities(finalAmnities));
  }, [amnities]);
  const handleSearch = async () => {
    if (!searchData.location) {
      return toast.error('Please Search by Place/Hotel');
    }

    dispatch(showLoading());
    await userApi
      .post('/fetch-search-data', searchData)
      .then((response) => {
        // dispatch(hideLoading());
        if (response.data.data.length == 0) return toast('no data found', { icon: '👏' });
        dispatch(setHotelData(response.data.data));
        dispatch(hideLoading());
        setFilterDiv(!filterDiv);
      })
      .catch((err) => {
        dispatch(hideLoading());
      });
  };

  return (
    <>
      <Navbar />
      <button
        onClick={() => {
          setFilterDiv(!filterDiv);
        }}
        className=' left-4 z-50 top-20 fixed bg-cyan-900  text-gray-50 p-2 rounded-full w-8 h-8 flex items-center justify-center'
      >
        {filterDiv ? <BiArrowBack /> : <AiOutlineSearch />}
      </button>
      {filterDiv && (
        <div
          className={`fixed top-0 left-0 bottom-0 overflow-scroll  focus:outline-none bg-white p-2 transform transition-transform duration-300 w-full max-w-md ${
            filterDiv ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className=' w-3/4 mx-auto my-10'>
            <input
              className='w-full text-center text-xs text-gray-500 fontfm tracking-wider rounded-xl'
              defaultValue={localStorage.getItem('location')}
              placeholder={'Ex: Trivandrum'}
              type='text'
              onChange={(e) => dispatch(setLocation(e.target.value))}
            />
            
            <div className='flex  w-full'>
              <div
                className='cursor-pointer flex h-10 fontfm items-center justify-center border rounded-xl my-2 border-gray-300 w-1/2 text-xs tracking-tighter text-center p-1'
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
                className='cursor-pointer flex h-10 first-letter: items-center fontfm justify-center rounded-xl ml-1 my-2 border border-gray-300 w-1/2   text-xs tracking-tighter text-center'
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
              className='bg-cyan-900 fontfm tracking-wider font-semibold rounded-xl w-full py-2 hover:bg-cyan-800 text-gray-50 hover:text-gray-50 duration-300 '
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* <div className=' flex flex-col  items-center justify-center mt-8'>
              <div className='bg-white h-auto w-fit'>
                <input
                  className='w-full text-center text-xs text-gray-500'
                  defaultValue={searchData?.location}
                  placeholder={'search by city or hotel'}
                  type='text'
                  onChange={(e) => {
                    localStorage.setItem('location', e.target.value);
                    dispatch(setLocation(e.target.value));
                  }}
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
                  onClick={handleSearch}
                >
                  search
                </button>
              </div>
            </div> */}
          <div>
            <div className='input-block font-sans p-4 w-full  flex justify-center'>
              <select
                className=' px-4 rounded-md py-2 w-48 border border-gray-400 left-0 right-0 mx-auto   '
                name='category'
                id='category'
                onChange={(e) => {
                  dispatch(sortHotelPrice(e.target.value));
                  handleSearch();
                }}
              >
                <option value={-1}>Price Low to High</option>
                <option value={1}>Price High to Low</option>
              </select>
            </div>
            <div className='px-4 h-auto grid  gap-2 border mt-10 py-10 rounded-xl  shadow-xl mx-auto w-3/4'>
              <h1 className='border-b w-fit fontfm '> Hotel Facilites</h1>
              <h1></h1>
              <div className='flex flex-row items-center gap-4 '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.internet}
                    onChange={handleCheckboxChange}
                    name='internet'
                    id='internet'
                    type='checkbox'
                    className='form-checkbox  h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 fontfm text-gray-600'>Internet</span>
                </label>
              </div>
              <div className='flex flex-row items-center gap-4 '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.bathTub}
                    onChange={handleCheckboxChange}
                    name='bathTub'
                    id='bathTub'
                    type='checkbox'
                    className='form-checkbox  h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 fontfm text-gray-600'>Bath Tub</span>
                </label>
              </div>
              <div className='flex flex-row items-center gap-4 '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.locker}
                    onChange={handleCheckboxChange}
                    name='locker'
                    id='locker'
                    type='checkbox'
                    className='form-checkbox  h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 fontfm text-gray-600'>locker</span>
                </label>
              </div>
              <div className='flex flex-row items-center gap-4 '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.laundry}
                    onChange={handleCheckboxChange}
                    name='laundry'
                    id='laundry'
                    type='checkbox'
                    className='form-checkbox  h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 fontfm text-gray-600'>laundry</span>
                </label>
              </div>
              <div className='flex flex-row items-center gap-4 '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.dryer}
                    onChange={handleCheckboxChange}
                    name='dryer'
                    id='dryer'
                    type='checkbox'
                    className='form-checkbox  h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 fontfm text-gray-600'>Dryer</span>
                </label>
              </div>
              <div className='flex flex-row items-center gap-4 '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.privateKitchen}
                    onChange={handleCheckboxChange}
                    name='privateKitchen'
                    id='privateKitchen'
                    type='checkbox'
                    className='form-checkbox  h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 fontfm text-gray-600'>Private Kitchen</span>
                </label>
              </div>
              <div className='flex flex-row items-center gap-4 '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.privatePool}
                    onChange={handleCheckboxChange}
                    name='privatePool'
                    id='privatePool'
                    type='checkbox'
                    className='form-checkbox  h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 fontfm text-gray-600'>Private Pool</span>
                </label>
              </div>
              <div className='flex flex-row items-center gap-4 '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.antiTheftKey}
                    onChange={handleCheckboxChange}
                    name='antiTheftKey'
                    id='antiTheftKey'
                    type='checkbox'
                    className='form-checkbox  h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 fontfm text-gray-600'>Anti Theft Key</span>
                </label>
              </div>

              {/* <h2 className='text-blue-600 font-sans font-semibold mt-4'> +View More</h2> */}
            </div>
          </div>
        </div>
      )}
      <div className={`flex flex-col  mt-4 ${filterDiv ? 'h-screen ' : ''}`}>
        {hotelData?.map((hotel, index) => {
          return (
            <div
              key={index}
              className=' px-6 mb-10'
              onClick={() => navigate('/single-room-details', { state: hotel._id })}
            >
              <div className='flex overflow-x-scroll'>
                {hotel?.images?.map((image, index) => (
                  <img
                    loading='lazy'
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    className='w-full h-auto rounded-2xl'
                  />
                ))}
              </div>
              <div className='w-full grid gap-4 '>
                <div className='my-4 px-1'>
                  <h1 className='font-bold text-cyan-900 fs tracking-wider text-xl'>{hotel?.hotelName}</h1>
                  <h1 className='text-gray-600 fs tracking-wider text-xs flex  '>
                    {hotel?.place} , {hotel?.city}
                  </h1>
                  <h1 className='font-semibold mt-2 fontfm'>
                    {hotel?.price} <span className='font-normal text-gray-500 fs text-xs'>night</span>
                  </h1>
                </div>
                {/* <div className=' flex items-end justify-end gap- text-xs  pb-4 pr-2 gap-1'>
                  <h1
                    className=' p-1 bg-cyan-700 text-gray-50 w-24 h-6 text-center'
                    onClick={() => navigate('/single-room-details', { state: hotel._id })}
                  >
                    book now
                  </h1>
                  <h1
                    className='border border-cyan-700 p-1 hover:bg-gray-50 text-center w-24 h-6'
                    onClick={() => navigate('/single-room-details', { state: hotel._id })}
                  >
                    viewdetails
                  </h1>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MobileScreenDisplayRooms;
