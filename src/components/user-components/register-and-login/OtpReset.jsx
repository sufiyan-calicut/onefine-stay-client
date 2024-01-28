import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../../api/userApi';
import { showLoading, hideLoading } from '../../../reduxToolkit/alertsReducer';
import { useDispatch } from 'react-redux';

// otp page for verify otp on the context of forgot password

function OtpReset() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userOtp, setUserOtp] = useState();
  const [showResend, setShowResend] = useState(false);
  const [countdown, setCountdown] = useState(30);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    if (countdown === 0) {
      setShowResend(true);
    }

    return () => clearTimeout(timer);
  }, [countdown]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!userOtp) {
        return toast.error('please enter otp');
      }
      dispatch(showLoading());
      const response = await userApi.post('/verify-reset-otp', { userOtp });
      if (response.data.success) {
        dispatch(hideLoading());
        toast.success(response.data.message);
        navigate('/set-new-password');
      } else {
        dispatch(hideLoading());
        return toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

    }
  };

  const handleResendOtp = async () => {
    try {
      dispatch(showLoading());
      const response = await userApi.post('/resendOtp');
      if (response.data.success) {
        dispatch(hideLoading());
        toast.success(response.data.message);
        setShowResend(false);
        setCountdown(60);
      } else {
        dispatch(hideLoading());
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('unable to send otp ');
    }
  };

  return (
    <div className='bg-gradient-to-r from-blue-900 to-slate-900 w-screen h-screen flex items-center justify-center '>
      <div className='flex bg-white items-center justify-center flex-col h-96 w-80  rounded-lg shadow-lg '>
        <h1 className='m-6 font-bold text-blue-600'>OTP</h1>
        <form className='p-6 ' onSubmit={handleSubmit}>
          <label className='block mb-3 font-semibold'>Enter OTP </label>
          <input
            className='block mb-3  number-input '
            type='number'
            onChange={(e) => setUserOtp(e.target.value)}
          />
          <button className='text-white bg-blue-700   py-1 px-2 rounded-md  hover:text-white hover:border-gray-500 hover:bg-blue-900 transition duration-500'>
            submit
          </button>
        </form>
        {showResend ? (
          <button className='text-red-500  hover:underline hover:text-red-600' onClick={handleResendOtp}>
            Resend otp
          </button>
        ) : (
          <p>
            resend otp in <span className='text-blue-700 font-normal'>{countdown}</span> seconds
          </p>
        )}
      </div>
    </div>
  );
}

export default OtpReset;
