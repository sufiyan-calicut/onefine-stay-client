import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../../reduxToolkit/alertsReducer';
import { userApi } from '../../../api/userApi';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userData = {
    name,
    place,
    email,
    phone,
    password,
  };

  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      if (password != confirmPassword) {
        return toast.error('password do not match');
      }
      dispatch(showLoading());
      const response = await userApi.post('/sendOtp', userData);
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/otp');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('something went wrong', error);

    }
  };

  return (
    <div className='bg-gradient-to-r from-blue-900 to-slate-900 w-screen h-screen flex items-center justify-center '>
      <div className='flex pb-10 p-6 bg-gray-100 items-center justify-center  flex-col h-auto w-auto  rounded-lg shadow-lg '>
        <h1 className='m-6 font-semibold text-blue-900 text-xl'>SIGN UP</h1>
        <form className='p-4 grid grid-cols-2 gap-3' onSubmit={sendOtp}>
          <div>
            <label className='block mb-2 '>Name </label>
            <input
              className='block mb-3  text-center w-full '
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='block mb-2 '>Place </label>
            <input
              className='block mb-3  text-center w-full '
              type='text'
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='block mb-2 '>Email </label>
            <input
              className='block mb-3  text-center w-full '
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='block mb-2 '>Phone </label>
            <input
              className='block mb-3  text-center w-full '
              type='text'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='block mb-2  '>Password </label>
            <input
              className='block mb-3 text-center w-full'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            {' '}
            <label className='block mb-2  '>Confirm Password </label>
            <input
              className='block mb-3 text-center w-full'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div></div>
          <div>
            <button className='text-white w-full text-sm bg-blue-700 mt-2  py-2 px-3 rounded-md  hover:text-white  hover:bg-blue-900  transition duration-500'>
              REGISTER
            </button>
          </div>
        </form>
        <p>
          Already have an account?
          <Link to='/login' className='text-blue-700 ml-1 underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
