import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { hotelApi } from '../../api/hotelApi';

function HotelSignIn() {
  const navigate = useNavigate();
  const [hotelID, setHotelID] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!hotelID) {
      return toast.error('please enter Hotel ID');
    } else if (!email) {
      return toast.error('please enter Email');
    } else {
      await hotelApi
        .post('/hotelLogin', {
          hotelID,
          email,
        })
        .then((response) => {
          toast.success(response.data.message);
          localStorage.setItem('hotelToken', response.data.hotelToken);
          localStorage.setItem('hotelId', response.data.hotelId);
          navigate('/hotel/hotel-dashboard');
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className='bg-gradient-to-r from-red-800 to-black w-screen h-screen flex items-center justify-center  '>
      <div className='flex bg-white items-center justify-center flex-col h-96 w-80  rounded-lg shadow-lg '>
        <h1 className='m-6 font-bold text-red-700 cursor-default'>HOTEL SIGN IN</h1>
        <p className='text-gray-500 cursor-default  '>
          didn't registered yet?{' '}
          <span
            className=' text-red-700 hover:underline hover:cursor-pointer  '
            onClick={() => navigate('/hotel-register-form')}
          >
            apply
          </span>{' '}
        </p>
        <form className='p-6 ' onSubmit={handleSubmit}>
          <label className='block mb-3 '>Hotel ID</label>
          <input
            className='block mb-3 px-4 py-2 '
            type='text'
            placeholder='Registered HotelID'
            required
            onChange={(e) => setHotelID(e.target.value)}
          />
          <label className='block mb-3  '>Email </label>
          <input
            className='block mb-3  px-4 py-2 rounded-lg border border-gray-400'
            type='email'
            placeholder='Registered Email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className='flex justify-between'>
            <button
              type='submit'
              className='text-white bg-red-800 font-semibold   py-1 px-2 rounded-md  hover:text-white hover:border-gray-500 hover:shadow-lg hover:bg-red-700 transition duration-500'
            >
              submit
            </button>
            <p className='text-gray-400 text-sm hover:underline cursor-pointer '>forget credentials?</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HotelSignIn;
