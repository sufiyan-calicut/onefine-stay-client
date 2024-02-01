import React, { useEffect, useState } from 'react';
import img from '../../../../public/images/profile.png';


import { MdCurrencyRupee } from 'react-icons/md';
import { userApi } from '../../../api/userApi';
import toast from 'react-hot-toast';


export default function profileComponent() {
  const [profileData, setProfileData] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await userApi.get('/fetchProfileData');

        setProfileData(response.data);
      } catch (error) {
        toast.error(error?.message);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div className='  w-full  mx-auto min-h-screen  h-full text-black overflow-scroll md:p-10 flex items-start justify-center '>
        <div className='bg-white shadow-xl h-full w-full sm:min-h-fit sm:max-h-96 sm:min-w-fit sm:max-w-lg  py-10 px-10 rounded-md flex flex-col items-center justify-center gap-4 mt-1 mx-auto'>
          <div className='px-3 relative select-none'>
            <div className='left-0 right-0 mx-auto rounded-full h-32 w-32 bg-blue-50 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 640 512'
                width={30}
                className='absolute right-0 bottom-10 cursor-pointer'
              >
                <path d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z' />
              </svg>
       
              <img loading='lazy' src={img} className='rounded-full h-32 w-32' alt='' />
            </div>
          </div>
          <h1 className='font-bold text-gray-800 tracking-wider fontfm sm:text-2xl '>{profileData?.name}</h1>
          <h1 className='text-gray-900 tracking-wider fontfm sm:text-md'>{profileData?.email}</h1>
          <h1 className='text-gray-900 tracking-wider fontfm sm:text-md'>{profileData?.phone}</h1>
          <h1 className='text-gray-900 font-bold tracking-wider flex items-center fontfm sm:text-md'>
            Wallet : {profileData?.walletBalance !== 'No Wallet' && <MdCurrencyRupee />} {profileData?.walletBalance}

          </h1>
        </div>
    
      </div>
    </>
  );
}
