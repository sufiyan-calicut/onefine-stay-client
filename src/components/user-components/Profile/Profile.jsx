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
    <div className='flex flex-col md:flex-row'>
      <div className='bg-sky-900 md:min-h-screen md:h-auto w-full md:w-1/6  text-gray-100 flex flex-col'>
        <div className='sticky top-0'>
          <div className='hidden md:block  md:pb-10 top-0 bg-gray-300 border-b rounded-b-md m-2 mt-0'>
            <div className='flex flex-col'>
              <div className='left-0 right-0 mx-auto h-20 w-20 rounded-full my-4'>
                <img loading='lazy' className='rounded-full h-20 w-20' src={img} alt='Profile' />
              </div>
              <h4 className='text-red-900 left-0 right-0 mx-auto text-xs font-semibold mt-2'>{profileData?.name}</h4>
              <h4 className='text-red-900 left-0 right-0 mx-auto text-xs font-semibold'>{profileData?.email}</h4>
            </div>
          </div>
          <div className='flex flex-col h-4/5 justify-start gap-4 py-24 items-center'>
            <div
              className={`${
                selectedButton === 'profile'
                  ? 'bg-sky-700 px-16 rounded-md py-2 duration-300 cursor-pointer'
                  : 'hover:bg-sky-700 px-16 rounded-md py-2 duration-300 cursor-pointer'
              }`}
              onClick={() => setSelectedButton('profile')}
            >
              Profile
            </div>
            <div
              className={`${
                selectedButton === 'bookings'
                  ? 'bg-sky-700 px-16 rounded-md py-2 duration-300 cursor-pointer'
                  : 'hover:bg-sky-700 px-16 rounded-md py-2 duration-300 cursor-pointer'
              }`}
              onClick={() => setSelectedButton('bookings')}
            >
              Bookings
            </div>
            <div
              className={`${
                selectedButton === 'wallet'
                  ? 'bg-sky-700 px-16 rounded-md py-2 duration-300 cursor-pointer'
                  : 'hover:bg-sky-700 px-16 rounded-md py-2 duration-300 cursor-pointer'
              }`}
              onClick={() => setSelectedButton('wallet')}
            >
              Wallet
            </div>
          </div>
        </div>
      </div>
      {selectedButton === 'profile' && <ProfileComponent value={profileData} />}
      {selectedButton === 'bookings' && <BookingHistory />}
      {selectedButton === 'wallet' && <WalletHistory />}
    </div>
  );
}

export default Profile;
