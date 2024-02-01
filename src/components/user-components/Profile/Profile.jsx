import React, { useEffect } from 'react';
import { useState } from 'react';
import Bookings from './Bookings';
import { userApi } from '../../../api/userApi';
import { toast } from 'react-hot-toast';
import img from '../../../../public/images/profile.png';
import { MdCurrencyRupee } from 'react-icons/md';
import ProfileComponent from './ProfileComponent';
import WalletHistory from './WalletHistory';
import BookingHistory from './BookingHistory';
import Navbar from '../partials/header/Navbar';

function Profile() {
  const [selectedButton, setSelectedButton] = useState('profile');
  const [profileData, setProfileData] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await userApi.get('/fetchProfileData');

        setProfileData(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='flex flex-col md:flex-row w-screen bg-gray-100  h-auto '>
        <Navbar />
        <div className='flex w-full  bg-gray-100 h-screen sm:mt-16 '>
          <div className='   bg-white fixed  drop-shadow-lg h-screen overflow-hidden  w-full sm:min-w-fit sm:w-1/6  text-gray-100 flex flex-col '>
            <div className=''>
              <div className='hidden sm:block  md:pb-10 mt-2 bg-gray-50 drop-shadow-lg border rounded-md m-2 '>
                <div className='flex flex-col p-2'>
                  <div className='left-0 right-0 mx-auto h-20 w-20 rounded-full my-4'>
                    <img loading='lazy' className='rounded-full h-20 w-20' src={img} alt='Profile' />
                  </div>
                  <h4 className='text-gray-900 left-0 right-0 mx-auto text-xs font-semibold mt-2 fontfm tracking-wider sm:text-lg'>
                    {profileData?.name}
                  </h4>
                  <h4 className='text-gray-900 left-0 right-0 mx-auto text-xs font-semibold'>{profileData?.email}</h4>
                </div>
              </div>
              <div className='flex flex-col h-4/5 justify-start gap-4 py-24 items-center'>
                <div
                  className={`${
                    selectedButton === 'profile'
                      ? 'bg-gray-700    text-white  fontfm tracking-wider shadow-lg'
                      : 'hover:bg-gray-700  hover:text-white bg-gray-50 text-black fontfm tracking-wider shadow-lg '
                  } px-2 w-3/4 text-center rounded-md py-2 duration-300 border cursor-pointer 
              `}
                  onClick={() => setSelectedButton('profile')}
                >
                  Profile
                </div>
                <div
                  className={`${
                    selectedButton === 'bookings'
                      ? 'bg-gray-700    text-white  fontfm tracking-wider shadow-lg'
                      : 'hover:bg-gray-700  hover:text-white bg-gray-50 text-black fontfm tracking-wider shadow-lg '
                  } px-2 w-3/4 text-center rounded-md py-2 duration-300 border cursor-pointer `}
                  onClick={() => setSelectedButton('bookings')}
                >
                  Bookings
                </div>
                <div
                  className={`${
                    selectedButton === 'wallet'
                      ? 'bg-gray-700    text-white  fontfm tracking-wider shadow-lg'
                      : 'hover:bg-gray-700  hover:text-white bg-gray-50 text-black fontfm tracking-wider shadow-lg '
                  } px-2 w-3/4 text-center rounded-md py-2 duration-300 border cursor-pointer `}
                  onClick={() => setSelectedButton('wallet')}
                >
                  Wallet
                </div>
              </div>
            </div>
          </div>
          <div className='w-screen bg-gray-100'>
            {selectedButton === 'profile' && <ProfileComponent />}
            {selectedButton === 'bookings' && <BookingHistory />}
            {selectedButton === 'wallet' && <WalletHistory />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
