import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../../reduxToolkit/alertsReducer';
import Navbar from '../partials/header/Navbar';
import { userApi } from '../../../api/userApi';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const userData = {
    email,
    password,
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      dispatch(showLoading());
      event.preventDefault();
      const response = await userApi.post('/doLogin', userData);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success('login successfull');
        localStorage.setItem('token', response.data.data);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('something went wrong');
    }
  };

  return (
    <>
      <Navbar/>
      <div className='bg-gray-100 rounded-md  h-auto w-64 p-2 left-0 top-0 m-10 absolute'>
        {/* <div className='border rounded-md p-4'>
          <p className='text-gray-600 font-serif mb-2'>
            Use these login credentials for quick access (for recruiters' convenience):
          </p>
          <p className='text-sm text-gray-500'>
            <span className='block'>Email: wopeca6779@pbridal.com</span>
            <span className='block'>Pass : 123456</span>
          </p>
        </div> */}
      </div>
      <div className='bg-gray-100 shadow-xl w-screen h-screen flex items-center justify-center '>
        <div className='flex p-6 bg-white  items-center justify-center  flex-col h-auto w-80  rounded-lg shadow-lg '>
          <h1 className='m-6 font-semibold text-blue-900 text-xl'>SIGN IN</h1>
          <form className='p-4  ' onSubmit={handleSubmit}>
            <label className='block mb-2 '>Email </label>
            <input
              className='block mb-3  text-center w-full '
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={handleEmailChange}
              required
            />
            <label className='block mb-2  '>Password </label>
            <input
              className='block mb-3 text-center w-full'
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <p className=' w-full flex justify-end '>
              <Link to='/forget-password' className=' ml-1  hover:underline'>
                forgot password?
              </Link>
            </p>

            <button className='text-white w-full text-sm bg-blue-700 mt-2  py-2 px-3 rounded-md  hover:text-white  hover:bg-blue-900  transition duration-500'>
              SIGN IN
            </button>
            <p className='mt-4'>
              don't have an account?
              <Link to='/register' className='text-blue-700 ml-1 underline'>
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
