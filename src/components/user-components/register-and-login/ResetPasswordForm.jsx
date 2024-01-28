import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../../api/userApi';
import { showLoading, hideLoading } from '../../../reduxToolkit/alertsReducer';
import { useDispatch } from 'react-redux';

function ResetPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!password) {
        return toast.error('please enter new password');
      }
      if (!confirmPassword) {
        return toast.error('re-enter new password');
      }
      if (password != confirmPassword) {
        return toast.error('password do not match');
      } else {
        dispatch(showLoading());
        const response = await userApi.post('/update-new-password', {
          password,
        });
        if (response.data.success) {
          dispatch(hideLoading());
          toast.success(response.data.message);
          navigate('/login');
        } else {
          dispatch(hideLoading());

          toast.error(response.data.message);
        }
      }
    } catch (error) {
      dispatch(hideLoading());


      toast.error('something went wronglllll');
    }
  };

  return (
    <div className='bg-gradient-to-r from-blue-900 to-slate-900  w-screen h-screen flex items-center justify-center '>
      <div className='flex bg-white items-center justify-center flex-col h-96 w-80  rounded-lg shadow-lg '>
        <h1 className='m-6 font-medium text-blue-600'>Reset your password</h1>
        <form className='p-6 ' onSubmit={handleSubmit}>
          <label className='block mb-3 font-'>Enter new password </label>
          <input className='block mb-3 font-thin ' type='password' onChange={(e) => setPassword(e.target.value)} />
          <label className='block mb-3 font-'>confirm new password </label>
          <input
            className='block mb-3 font-thin '
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className='text-white bg-blue-700   py-1 px-2 rounded-md  hover:text-white hover:border-gray-500 hover:bg-blue-900 transition duration-500'>
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
