import React, { useEffect, useState } from 'react';
import img from '../../../../public/images/profile.png';
import { MdCurrencyRupee } from 'react-icons/md';

export default function profileComponent({ value }) {
  const [profileData, setProfileData] = useState();
  useEffect(() => {
    setProfileData(value);

  }, []);
  return (
    <>
      <div className='  w-full md:w-5/6 h-full text-black overflow-auto  md:flex items-start justify-center'>
        <div className='bg-cyan-800 h-full w-full md:h-3/4 md:w-2/4 p-10 rounded-b-md flex flex-col items-center justify-center gap-4'>
          <div className='left-0 right-0 mx-auto rounded-full h-32 w-32 bg-blue-50'>
            <img loading='lazy' src={img} className='rounded-full h-32 w-32' alt='' />
          </div>
          <h1 className='font-bold text-gray-300 tracking-wider'>{profileData?.name}</h1>
          <h1 className='text-gray-300 tracking-wider'>{profileData?.email}</h1>
          <h1 className='text-gray-300 tracking-wider'>{profileData?.phone}</h1>
          <h1 className='text-gray-300 font-bold tracking-wider flex items-center'>
            Wallet : {profileData?.walletBalance !== 'No Wallet' && <MdCurrencyRupee />} {profileData?.walletBalance}
          </h1>
        </div>
      </div>
    </>
  );
}
