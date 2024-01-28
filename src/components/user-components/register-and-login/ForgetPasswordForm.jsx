import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../../api/userApi';
import { hideLoading,showLoading } from '../../../reduxToolkit/alertsReducer';
import { useDispatch } from 'react-redux';

function ForgetPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usermail, setUsermail] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!usermail) {
        return toast.error('please enter email');
      }
      dispatch(showLoading());
      const response = await userApi.post('/reset-password', { usermail });
      if (response.data.success) {
        dispatch(hideLoading());
        toast.success(response.data.message);
        navigate('/otp-reset');
      } else {
        dispatch(hideLoading());

        return toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());


    }
  };

  return (
    <div className='bg-gradient-to-r from-blue-900 to-slate-900 w-screen h-screen flex items-center justify-center '>
      <div className='flex bg-white  items-center  justify-start flex-col h-60 w-80  rounded-lg shadow-lg '>
        <div className=''>
          {' '}
          <h1 className=' font-semibold text-blue-600 my-6 '>FORGOT PASSWORD?</h1>
        </div>
        <div className=' w-full h-full flex justify-center '>
          <form className='p-4' onSubmit={handleSubmit}>
            <label className='block mb-3 font-normal text-xs'>Enter your registered email </label>
            <input
              className='block mb-3 '
              type='email'
              placeholder='email:'
              onChange={(e) => setUsermail(e.target.value)}
            />
            <button className='text-white font-semibold  bg-blue-700   py-1 px-2 rounded-md  hover:text-white hover:border-gray-500 hover:bg-blue-900  transition duration-500'>
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordForm;
