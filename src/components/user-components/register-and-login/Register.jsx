import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../../reduxToolkit/alertsReducer';
import { userApi } from '../../../api/userApi';
import registerImg from '../../../../public/images/download.jfif';
import './Login.css';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <div className='loginCard bg-gradient-to-r bg-gray-100 md:min-w-screen md:w-auto md:min-h-screen md:h-auto flex items-center justify-center '>
      <div className='flex py-6 md:p-6 md:m-4 bg-gray-100  md:bg-white items-center justify-center  h-full w-full md:min-h-3/4 md:min-w-3/4 md:h-auto md:w-auto  rounded-lg shadow-xl  '>
        {!isMobile && (
          <div className=' w-1/2'>
            <img src={registerImg} alt='' />
          </div>
        )}
        <div className=' flex-col w-auto sm:w-1/2 md:w-1/2  '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 5300 1024'
            width='200'
            height='60'
            className='text-blue-700 m-auto'
          >
            <path
              className='svg-path'
              fill='#2a2730'
              d='M261 756.4c-102.4 0-162-109-162-237.8 0-132 49.6-221.3 145.4-221.3 102.4 0 162 109 162 237.8 0 132.3-46.3 221.4-145.4 221.4zm-3.3-512C115.7 244.4 0 360 0 538.4c0 158.6 99 271 251 271 138.8 0 257.7-115.7 257.7-294-3.3-155.3-99-271-251-271zm2556.6 459.2V413c0-119-52.8-168.6-145.3-168.6-86 0-148.6 53-198.2 102.4V244.4h-26.4l-138.7 53v23l72.6 36.3V707c0 46-33 52.7-79.3 59.3v36.4h254.4v-36.4c-46.3-6.6-79.3-10-79.3-59.4V376.5c39.8-29.8 99.2-53 152-53 66 0 96 26.5 96 99.2v284c0 46.3-33.2 53-79.4 59.5v36.4H2897v-36.4c-46.3-10-82.7-13.2-82.7-62.7zM3138 294c86 0 129 62.7 129 161.8h-271c6.6-85.8 59.5-161.8 142-161.8zm39.7 439.3c-115.6 0-188.3-92.5-188.3-224.6H3356v-33c0-135.5-69.3-228-208-228-142 0-247.8 119-247.8 300.6 0 148.7 89.2 264.3 238 264.3 115.5 0 191.5-66 214.6-158.6l-16.5-10c-33 49.7-79.3 89.3-158.6 89.3zM1367.5 294c86 0 129 62.7 129 161.8h-271c10-85.8 62.8-161.8 142-161.8zm43 439.3c-115.6 0-188.3-92.5-188.3-224.6H1589v-33c0-135.5-69.5-228-208.3-228-142 0-247.7 119-247.7 300.6 0 148.7 89.2 264.3 237.8 264.3 115.7 0 191.6-66 214.7-158.6l-16.5-10c-33 49.7-82.5 89.3-158.5 89.3zm753-29.7V244.4h-23l-26.4 13.3h-287.3V208c0-105.6 49.5-158.5 109-158.5 49.5 0 69.4 20 69.4 72.7v26.4h59.5c19.8-10 36.3-33 36.3-56 0-53-62.7-79.4-145.3-79.4-135.4 0-221.3 92.5-221.3 221.3v13.2l-76 26.5v33h76v396.4c0 46.2-33 52.8-79.3 59.4v36.4h254.3V763c-46.3-6.6-79.3-10-79.3-59.4V307.2h241v396.4c0 46.2-33 52.8-79.2 59.4v36.4h254.4V763c-49.6-6.6-82.6-10-82.6-59.4zM5087 254.3v36.4c52.8 6.6 72.6 13.2 72.6 36.3 0 6.6-3.3 13.2-6.6 26.4L5027.5 687 4892 353.5c-6.5-13.2-6.5-19.8-6.5-26.4 0-23 19.8-29.7 72.6-36.3v-36.4h-241v36.4c46.3 16.5 49.6 19.8 59.5 39.6l204.8 472.4-20 52.8c-19.7 56.2-46 69.4-112.2 69.4h-52.7v46c16.5 23.3 46.2 36.5 79.3 36.5 62.7 0 95.8-43 119-109L5222.3 327c6.6-23 13.2-23 59.5-39.6v-33h-195zm-525.2 436c-43 33-79.3 46.3-125.6 46.3-52.8 0-82.5-33-82.5-92.5 0-39.5 23-69.2 62.7-82.5l145.4-56v185zm138.7 53c-29.7 0-46.3-23.2-46.3-69.4 0-43 3.3-221.5 3.3-254.5 0-112.3-59.4-171.8-178.3-171.8-112.3 0-195 49.6-195 132.2 0 23 6.7 39.5 23.2 56l76-10c-6.6-19.7-6.6-36.2-6.6-52.7 0-53 29.7-76 86-76 79 0 102.3 52.8 102.3 115.6v49.5L4403.3 522c-66 23-142 56-142 152 0 75.8 43 138.6 135.4 138.6 76 0 135.4-53 171.8-92.5 10 56.3 36.3 92.6 85.8 92.6 36.4 0 69.4-13.2 102.4-49.6l-6.6-23c-16.5 0-39.6 3.2-49.5 3.2zM1047 703.5V413c0-119-52.7-168.6-145.2-168.6-86 0-148.7 53-198.2 102.4V244.4h-26.4l-142 53v23l72.6 36.3V707c0 46-33 52.7-79.3 59.3v36.4H783v-36.4c-46.4-6.6-79.4-10-79.4-59.4V376.5c39.6-29.8 99-53 152-53 66 0 95.7 26.5 95.7 99.2v284c0 46.3-33 53-79.2 59.5v36.4h254.4v-36.4c-46.2-10-79.3-13.2-79.3-62.7zm3154.7 19.8c-26.4 13.2-62.8 23-95.8 23-56.2 0-82.7-19.7-82.7-75.8V320.4H4182V271h-158.7v-89.3c0-43-13.2-76-33-105.7-33-49.6-95.8-76-162-72.7-66-3.3-125.4 26.4-161.7 72.7-19.8 29.7-29.7 62.7-33 105.7v10c3.3 26.3 6.6 46 13.2 59.3h-26.5c-109 0-178.3 66-178.3 155.3 0 95.8 59.4 132 152 162S3736 621 3736 687c0 53-39.7 86-105.8 86-85.8 0-135.4-53-155.2-142h-39.6l6.6 138.7c49.5 39.6 119 49.5 188.2 49.5 119 0 191.6-69.4 191.6-162 0-105.6-69.3-135.3-171.7-168.3-79.2-26.5-122.2-56.3-122.2-112.4 0-46.3 33-82.6 89.2-82.6 72.7 0 119 43 135.5 125.5h39.6v-142s-9.8-3.3-23-6.6l-23-10c-3.4-3.3-13.4-10-13.4-10-23-19.8-36.3-46.2-36.3-82.5v-33c6.6-49.6 49.6-89.3 105.7-96h46.3c56 6.7 99 46.4 105.7 96 0 9.8 3.3 23 0 33-3.3 33-16.6 62.7-36.4 82.5 0 0-10 6.6-13.2 10-19.8 13.2-43 13.2-46.2 16.5v43h62.7v370c0 89 52.8 122 122 122s122.4-26.3 158.7-66v-23z'
              fillOpacity='1'
            />
          </svg>
          <form className='p-4 md:grid md:grid-cols-2 gap-3 md:w-full  ' onSubmit={sendOtp}>
            <div>
              <label className='block ml-3 fontfm '>Name </label>
              <input
                className='block mb-3 text-sm fontfm  text-center w-full '
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className='block ml-3 fontfm '>Place </label>
              <input
                className='block mb-3 text-sm fontfm  text-center w-full '
                type='text'
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                required
              />
            </div>
            <div>
              <label className='block ml-3 fontfm'>Email </label>
              <input
                className='block mb-3 text-sm fontfm  text-center w-full '
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className='block ml-3 fontfm '>Phone </label>
              <input
                className='block mb-3 text-sm fontfm  text-center w-full '
                type='text'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label className='block ml-3 fontfm  '>Password </label>
              <input
                className='block mb-3 text-sm fontfm text-center w-full'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              {' '}
              <label className='block ml-3 fontfm '>Confirm Password </label>
              <input
                className='block mb-3 text-sm fontfm text-center w-full'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <button className='text-white w-full text-sm bg-blue-700 mt-2 py-2 px-3 rounded-md hover:text-white hover:bg-blue-900 transition duration-500'>
                REGISTER
              </button>
            </div>
          </form>
          <p className='mx-4 fontfm self-end  '>
            Already have an account?
            <Link to='/login' className='text-blue-700 ml-1 underline fontfm'>
              Login
            </Link>
          </p>
          {/* <div className='bg-gray-30 flex flex-col justify-center items-center'>
            <h3 className='fontfm '>OR</h3>
            <button className=' shadow-lg bg-gray-100 flex-1 w-72 max-w-xl text-sm  border text-black mt-2  py-2 px-3 rounded-md  hover:text-white  hover:bg-blue-900  transition duration-500'>
              Register with Google
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
