import React, { useEffect, useState } from 'react';
import img from '../../../../public/images/3done.jpg';
import { MdCurrencyRupee } from 'react-icons/md';
import { userApi } from '../../../api/userApi';
import { toast } from 'react-hot-toast';

function Wallet() {
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    getWalletBalance();
  }, []);

  async function getWalletBalance() {
    try {
      const response = await userApi.get('/fetch-wallet-balance');
      setWalletBalance(response.data.walletBalance);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className='bg-red-80  w-5/6 h-full text-black overflow-auto  flex items-start justify-center'>
      <div className='bg-cyan-800 h-3/4 w-2/4 p-10 rounded-b-md flex flex-col items-center justify-center gap-4'>
        <div className='left-0 right-0 mx-auto rounded-full h-32 w-32 bg-blue-50'>
          <img loading='lazy' src={img} className='rounded-full h-32 w-32' alt='' />
        </div>
        <h1 className='font-bold text-gray-300 tracking-wider'>Sufiyan</h1>
        <h1 className='text-gray-300 tracking-wider'>Sufiyan@gmail.com</h1>
        <h1 className='text-gray-300 tracking-wider'>9946257644</h1>
        <h1 className='text-gray-300 font-bold tracking-wider flex items-center'>
          Wallet : <MdCurrencyRupee /> {walletBalance}
        </h1>
      </div>
    </div>
  );
}

export default Wallet;
