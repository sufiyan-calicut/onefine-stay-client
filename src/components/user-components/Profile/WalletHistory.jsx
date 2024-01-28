import React, { useEffect, useState } from 'react';
import { userApi } from '../../../api/userApi';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../../reduxToolkit/alertsReducer';

function WalletHistory() {
  const dispatch = useDispatch();
  const [walletHistory, setWalletHistory] = useState([]);

  useEffect(() => {
    getWalletHistory();
  }, []);

  async function getWalletHistory() {
    try {
      dispatch(showLoading());
      const response = await userApi.get('/fetch-wallet-history');

      dispatch(hideLoading());
      setWalletHistory(response.data);
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className='w-full md:w-5/6 h-full text-black overflow-auto md:p-10 '>
      {walletHistory?.length !== 0 ? (
        <h1 className='text-center font-sans text-lg mb-4 font-bold tracking-wider text-gray-400'>Wallet History</h1>
      ) : (
        <div>
          <h1 className='text-center  font-bold text-gray-500'>You Don't have wallet history!</h1>
        </div>
      )}

      {walletHistory?.length != 0 && (
        <div className='border min-h-20 h-auto w-full md:left-0 md:right-0 md:mx-auto flex-col '>
          <div className='flex gap-2 p-5 w-full bg-cyan-900 text-gray-50'>
            <h4 className='w-1/12 overflow-auto text-center'>Booking ID</h4>
            <h4 className='w-3/12 overflow-auto text-center'>Booking Date</h4>
            <h4 className='w-3/12 overflow-auto text-center'>Hotel Name</h4>
            <h4 className='w-3/12 overflow-auto text-center'>Description</h4>
            <h4 className='w-1/12 overflow-auto text-center'> Credit</h4>
            <h4 className='w-1/12 overflow-auto text-center'> Debit</h4>
          </div>
          {walletHistory?.map((point, index) => {
            const date = new Date(point?.transactions?.booking?.createdAt);
            const defaultDate =
              date.toLocaleString('default', { weekday: 'long' }) +
              ' ' +
              date.getDate() +
              ' ' +
              date.toLocaleString('default', { month: 'long' });
            return (
              <div key={index} className='flex gap-2 items-center justify-center w-full p-5 border-b'>
                <h4 className='w-1/12  overflow-auto text-center'>{point?.transactions?.booking?.bookingId}</h4>
                <h4 className='w-3/12 overflow-auto text-center'>{defaultDate}</h4>
                <h4 className='w-3/12 overflow-auto text-center'>{point?.transactions?.hotel?.hotelName}</h4>
                <h4 className='w-3/12 overflow-auto text-center '>{point?.transactions?.description}</h4>
                {point?.transactions?.type == 'credit' ? (
                  <h4 className='w-1/12 overflow-auto text-center text-green-600'> {point?.transactions?.amount}</h4>
                ) : (
                  <h4 className='w-1/12'></h4>
                )}
                {point?.transactions?.type == 'debit' ? (
                  <h4 className='w-1/12 overflow-auto text-center text-red-600'> {point?.transactions?.amount}</h4>
                ) : (
                  <h4 className='w-1/12'></h4>
                )}
              </div>
            );
          })}
          <div className=' w-full p-5 border-b border-cyan-800 text-end font-bold md:pr-16'>
            TOTAL : {walletHistory?.[0]?.balance}
          </div>
        </div>
      )}
    </div>
  );
}

export default WalletHistory;
