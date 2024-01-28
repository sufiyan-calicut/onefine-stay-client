import React, { lazy, Suspense } from 'react';
import { useEffect, useState } from 'react';
import { userApi } from '../../../api/userApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../../../reduxToolkit/alertsReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHotelData,
  setIsDataOver,
  setLocation,
  sortHotelPrice,
  updateAmnities,
} from '../../../reduxToolkit/searchSlice';
import HotelData from './HotelData';

// import HotelData from './HotelData';
// const HotelData = lazy(() => import('./HotelData'));
import { toast } from 'react-hot-toast';

const HotelList = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    handleSearch();
    console.log(searchData.isDataOver, 'inside effect');
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchData.sort]);
  useEffect(() => {
    let finalAmnities = Object.keys(amnities).filter((key) => amnities[key]);
    dispatch(updateAmnities(finalAmnities));
  }, [amnities]);

  const handleSearch = async () => {
    if (!searchData.location) {
      return toast.error('give your location in search bar');
    }

    dispatch(showLoading());
    await userApi
      .post('/fetch-search-data', searchData)
      .then((response) => {
        dispatch(hideLoading());
        if (response.data.data.length == 0) return toast('no data found', { icon: '👏' });
        dispatch(setHotelData(response.data.data));
        dispatch(setIsDataOver(response.data.isDataOver));
      })
      .catch((err) => {
        dispatch(hideLoading());
        toast.error(err?.message);
      });
  };

  return (
    <div className=''>
      <div className=' h-auto w-screen flex bg-white md:pt-20 '>
        <div className=' h-auto w-92 bg-white  border-gray-300 p-6 border-r '>
          <div className='sticky top-32'>
            <h1 className='font-sans font-bold text-lg'>Filters</h1>
            {/* <div className='border-b p-4 h-72'>
              <div>
                <h4>Popular locations in {searchData.location}</h4>
                <input type='search' placeholder='search' className='p-2 h-1 rounded-xl' />
              </div>
              <div className='flex flex-wrap gap-2 w-60 mt-3'>
                <div className='w-auto p-2 h-9  bg-gray-200'>kgm</div>
                <div className='w-auto p-2 h-9  bg-gray-200'>kuttikattoor</div>
                <div className='w-auto p-2 h-9  bg-gray-200'>medical Collage</div>
                <div className='w-auto p-2 h-9  bg-gray-200'>Kovoor</div>
                <div className='w-auto p-2 h-9  bg-gray-200'>Mavoor</div>
              </div>
              <h3 className='text-blue-600 font-sans font-semibold mt-4'>+ View More</h3>
            </div> */}

            <div className='input-block font-sans p-4'>
              <label htmlFor='' className='input-label block '>
                Sort By
              </label>
              <select
                className=' px-4 py-2 w-48 border  '
                name='category'
                id='category'
                onChange={(e) => {
                  dispatch(sortHotelPrice(e.target.value));
                }}
              >
                <option value={1}>Price Low to High</option>
                <option value={-1}>Price High to Low</option>
              </select>
            </div>
            <div className='px-4 h-auto grid grid-cols-2 gap-2 border mt-10 py-10'>
              <h1 className='border-b w-fit'> Hotel Facilites</h1>
              <h1></h1>
              <div className='flex flex-row items-center gap-4 '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.internet}
                    onChange={handleCheckboxChange}
                    name='internet'
                    id='internet'
                    type='checkbox'
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>Internet</span>
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
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>Bath Tub</span>
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
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>locker</span>
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
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>laundry</span>
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
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>Dryer</span>
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
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>Private Kitchen</span>
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
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>Private Pool</span>
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
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>Anti Theft Key</span>
                </label>
              </div>

              {/* <h2 className='text-blue-600 font-sans font-semibold mt-4'> +View More</h2> */}
            </div>
          </div>
        </div>
        <div className=' w-full mx-10 my-4 '>
          {hotelData?.map((data, i) => {
            return <HotelData key={i} value={data} />;
          })}
          {!searchData.isDataOver && (
            <div
              className='bg-white hover:bg-gray-300 duration-300 cursor-pointer h-10 w-40 left-0 right-0 mx-auto my-10 flex items-center justify-center text-blue-900'
              onClick={handleSearch}
            >
              {' '}
              Show More
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelList;
