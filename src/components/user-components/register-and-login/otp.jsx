import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userApi } from '../../../api/userApi';
import { showLoading, hideLoading } from '../../../reduxToolkit/alertsReducer';
import { useDispatch } from 'react-redux';

const OtpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState();
  const [showResend, setShowResend] = useState(false);
  const [countdown, setCountdown] = useState(30);
  let userOtp = { otp };
  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    if (countdown === 0) {
      setShowResend(true);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResendOtp = async () => {
    try {
      dispatch(showLoading());
      const response = await userApi.post('/resendOtp');

      if (response.data.success) {
        dispatch(hideLoading());
        toast.success(response.data.message);

        // code to resend OTP
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

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(showLoading());
    const response = await userApi.post('/verifyOtp', userOtp);

    if (response.data.success) {
      dispatch(hideLoading());

      toast.success(response.data.message);
      navigate('/login');
    } else {
      dispatch(hideLoading());

      toast.error(response.data.message);
    }
  };

  return (
    <div className='bg-gradient-to-r from-blue-900 to-slate-900 w-screen h-screen flex items-center justify-center '>
      <div className='flex p-6 bg-gray-100 items-center justify-center  flex-col h- w-80  rounded-lg shadow-lg '>
        <h1 className='m-2 font-semibold text-blue-900 text-xl'>ENTER OTP</h1>
        <form className='p-4  ' onSubmit={handleSubmit}>
          <label className='block mb-2 '>Otp </label>
          <input
            className='block mb-3  text-center w-full number-input '
            type='number'
            value={otp}
            onChange={handleOtpChange}
            required
          />

          <button className='text-white  text-sm bg-blue-700 mt-2  py-2 px-3 rounded-md  hover:text-white  hover:bg-blue-900  transition duration-500'>
            SUBMIT
          </button>
          <div>
            {showResend ? (
              <button className='text-blue-800 hover:underline float-right mt-4' onClick={handleResendOtp}>
                Resend OTP
              </button>
            ) : (
              <p className=' mt-4'>Resend OTP in {countdown} seconds</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;
