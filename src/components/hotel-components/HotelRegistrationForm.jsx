import React, { useRef, useState } from 'react';
import { hotelApi } from '../../api/hotelApi';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../../reduxToolkit/alertsReducer';
import { useDispatch } from 'react-redux';

function HotetlRegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null);

  // states of counts
  let [hotelName, setHotelName] = useState();
  let [email, setEmail] = useState();
  let [phoneNumber, setPhoneNumber] = useState();
  let [price, setPrice] = useState();

  let [place, setPlace] = useState('');
  let [city, setCity] = useState('');
  let [state, setState] = useState('');
  let [pincode, setPincode] = useState();
  let [images, setImages] = useState([]);
  let [rooms, setRooms] = useState(1);
  let [allowedGuests, setAllowedGuests] = useState(1);
  let [Kitchen, setKitchen] = useState(1);
  let [pool, setPool] = useState(1);
  let [rules, setRules] = useState([]);
  let [description, setDescription] = useState('');

  // check box state

  let [amnities, setAmnities] = useState({
    locker: false,
    dryer: false,
    internet: false,
    privateKitchen: false,
    privatePool: false,
    bathTub: false,
    antiTheftKey: false,
    laundry: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setAmnities((prevamnities) => ({ ...prevamnities, [name]: checked }));
  };

  const handleRules = (rule) => {
    if (!rules.includes(rule)) {
      setRules([...rules, rule]);
    } else {
      toast.error('this rule already added');
    }
  };

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      const rule = event.target.value;
      if (!rule) {
        return;
      }
      // Perform actions with the value, such as updating state
      if (!rules.includes(rule)) {
        setRules([...rules, rule]);
      } else {
        toast.error('this rule already added');
      }
      event.target.value = ''; // Clear the input field
    }
  }

  function deleteRule(index) {
    const filteredRules = rules.filter((_, i) => i !== index);
    setRules(filteredRules);
  }

  const hotelData = {
    hotelName,
    email,
    phoneNumber,
    place,
    price,
    city,
    state,
    pincode,
    images,
    amnities: Object.keys(amnities).filter((key) => amnities[key]),
    rooms,
    Kitchen,
    pool,
    allowedGuests,
    rules,
    description,
  };

  const resetForm = () => {
    setRooms(1);
    setAllowedGuests(1);
    setKitchen(1);
    setPool(1);
    setRules([]);
    setAmnities([
      {
        locker: false,
        dryer: false,
        internet: false,
        privateKitchen: false,
        privatePool: false,
        bathTub: false,
        antiTheftKey: false,
        laundry: false,
      },
    ]);
  };

  const handleSubmit = async (event) => {
    if (Object.values(hotelData).some((value) => !value)) {
      toast.error('complete all field before submission');
      return;
    }
    dispatch(showLoading());

    let imageUrl = [];
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('file', images[i]);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      await axios
        .post(import.meta.env.VITE_CLOUDINARY_URL, formData)
        .then((response) => {
          const newurl = response.data.url;
          imageUrl = [...imageUrl, newurl];
        })
        .catch((error) => toast.error('network error'));
    }

    const response = await hotelApi.post('/newRegistration', {
      hotelData,
      imageUrl,
    });
    if (response.data.success) {
      dispatch(hideLoading());
      toast.success(response.data.message);
      formRef.current.reset();
      resetForm();
      navigate('/hotel/greatings');
    } else {
      dispatch(hideLoading());
      toast.error(response.data.message);
    }
  };

  return (
    <div className='bg-gray-100 sm:p-2 md:p-12'>
      <div
        className=' border bg-white rounded-xl overflow-x-auto scrollbar-hide  mx-auto my-auto h-full w-full md:w-   text-lg px-10 py-10
       block'
      >
        <div className=' mb-6  border-b w-fit p-2'>
          <h1 className='text-xl font-mono '>
            REGISTER YOUR HOTEL IN{' '}
            <span className=' text-blue-900'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5300 1024' width='250' height='30'>
                <path
                  className='svg-path'
                  fill='#2a2730'
                  d='M261 756.4c-102.4 0-162-109-162-237.8 0-132 49.6-221.3 145.4-221.3 102.4 0 162 109 162 237.8 0 132.3-46.3 221.4-145.4 221.4zm-3.3-512C115.7 244.4 0 360 0 538.4c0 158.6 99 271 251 271 138.8 0 257.7-115.7 257.7-294-3.3-155.3-99-271-251-271zm2556.6 459.2V413c0-119-52.8-168.6-145.3-168.6-86 0-148.6 53-198.2 102.4V244.4h-26.4l-138.7 53v23l72.6 36.3V707c0 46-33 52.7-79.3 59.3v36.4h254.4v-36.4c-46.3-6.6-79.3-10-79.3-59.4V376.5c39.8-29.8 99.2-53 152-53 66 0 96 26.5 96 99.2v284c0 46.3-33.2 53-79.4 59.5v36.4H2897v-36.4c-46.3-10-82.7-13.2-82.7-62.7zM3138 294c86 0 129 62.7 129 161.8h-271c6.6-85.8 59.5-161.8 142-161.8zm39.7 439.3c-115.6 0-188.3-92.5-188.3-224.6H3356v-33c0-135.5-69.3-228-208-228-142 0-247.8 119-247.8 300.6 0 148.7 89.2 264.3 238 264.3 115.5 0 191.5-66 214.6-158.6l-16.5-10c-33 49.7-79.3 89.3-158.6 89.3zM1367.5 294c86 0 129 62.7 129 161.8h-271c10-85.8 62.8-161.8 142-161.8zm43 439.3c-115.6 0-188.3-92.5-188.3-224.6H1589v-33c0-135.5-69.5-228-208.3-228-142 0-247.7 119-247.7 300.6 0 148.7 89.2 264.3 237.8 264.3 115.7 0 191.6-66 214.7-158.6l-16.5-10c-33 49.7-82.5 89.3-158.5 89.3zm753-29.7V244.4h-23l-26.4 13.3h-287.3V208c0-105.6 49.5-158.5 109-158.5 49.5 0 69.4 20 69.4 72.7v26.4h59.5c19.8-10 36.3-33 36.3-56 0-53-62.7-79.4-145.3-79.4-135.4 0-221.3 92.5-221.3 221.3v13.2l-76 26.5v33h76v396.4c0 46.2-33 52.8-79.3 59.4v36.4h254.3V763c-46.3-6.6-79.3-10-79.3-59.4V307.2h241v396.4c0 46.2-33 52.8-79.2 59.4v36.4h254.4V763c-49.6-6.6-82.6-10-82.6-59.4zM5087 254.3v36.4c52.8 6.6 72.6 13.2 72.6 36.3 0 6.6-3.3 13.2-6.6 26.4L5027.5 687 4892 353.5c-6.5-13.2-6.5-19.8-6.5-26.4 0-23 19.8-29.7 72.6-36.3v-36.4h-241v36.4c46.3 16.5 49.6 19.8 59.5 39.6l204.8 472.4-20 52.8c-19.7 56.2-46 69.4-112.2 69.4h-52.7v46c16.5 23.3 46.2 36.5 79.3 36.5 62.7 0 95.8-43 119-109L5222.3 327c6.6-23 13.2-23 59.5-39.6v-33h-195zm-525.2 436c-43 33-79.3 46.3-125.6 46.3-52.8 0-82.5-33-82.5-92.5 0-39.5 23-69.2 62.7-82.5l145.4-56v185zm138.7 53c-29.7 0-46.3-23.2-46.3-69.4 0-43 3.3-221.5 3.3-254.5 0-112.3-59.4-171.8-178.3-171.8-112.3 0-195 49.6-195 132.2 0 23 6.7 39.5 23.2 56l76-10c-6.6-19.7-6.6-36.2-6.6-52.7 0-53 29.7-76 86-76 79 0 102.3 52.8 102.3 115.6v49.5L4403.3 522c-66 23-142 56-142 152 0 75.8 43 138.6 135.4 138.6 76 0 135.4-53 171.8-92.5 10 56.3 36.3 92.6 85.8 92.6 36.4 0 69.4-13.2 102.4-49.6l-6.6-23c-16.5 0-39.6 3.2-49.5 3.2zM1047 703.5V413c0-119-52.7-168.6-145.2-168.6-86 0-148.7 53-198.2 102.4V244.4h-26.4l-142 53v23l72.6 36.3V707c0 46-33 52.7-79.3 59.3v36.4H783v-36.4c-46.4-6.6-79.4-10-79.4-59.4V376.5c39.6-29.8 99-53 152-53 66 0 95.7 26.5 95.7 99.2v284c0 46.3-33 53-79.2 59.5v36.4h254.4v-36.4c-46.2-10-79.3-13.2-79.3-62.7zm3154.7 19.8c-26.4 13.2-62.8 23-95.8 23-56.2 0-82.7-19.7-82.7-75.8V320.4H4182V271h-158.7v-89.3c0-43-13.2-76-33-105.7-33-49.6-95.8-76-162-72.7-66-3.3-125.4 26.4-161.7 72.7-19.8 29.7-29.7 62.7-33 105.7v10c3.3 26.3 6.6 46 13.2 59.3h-26.5c-109 0-178.3 66-178.3 155.3 0 95.8 59.4 132 152 162S3736 621 3736 687c0 53-39.7 86-105.8 86-85.8 0-135.4-53-155.2-142h-39.6l6.6 138.7c49.5 39.6 119 49.5 188.2 49.5 119 0 191.6-69.4 191.6-162 0-105.6-69.3-135.3-171.7-168.3-79.2-26.5-122.2-56.3-122.2-112.4 0-46.3 33-82.6 89.2-82.6 72.7 0 119 43 135.5 125.5h39.6v-142s-9.8-3.3-23-6.6l-23-10c-3.4-3.3-13.4-10-13.4-10-23-19.8-36.3-46.2-36.3-82.5v-33c6.6-49.6 49.6-89.3 105.7-96h46.3c56 6.7 99 46.4 105.7 96 0 9.8 3.3 23 0 33-3.3 33-16.6 62.7-36.4 82.5 0 0-10 6.6-13.2 10-19.8 13.2-43 13.2-46.2 16.5v43h62.7v370c0 89 52.8 122 122 122s122.4-26.3 158.7-66v-23z'
                  fillOpacity='1'
                />
              </svg>
            </span>
          </h1>
        </div>
        <form ref={formRef} className='  text-sm text-blue-900' id='form'>
          <div className='bg-blue-20 flex  flex-col mt-10 mx-2 md:mx-10 py-4 px-10 pb-6 rounded-md border'>
            <div className=''>
              <h1 className='border-b m-2 text-blue-900 font-semibold font-mono text-xl w-fit'>Hotel Details</h1>
            </div>

            <div>
              <div className='grid items-center justify-center xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10'>
                <div className='input-block  '>
                  <label className='input-label font-mono  block '>Hotel Name</label>

                  <input
                    onChange={(e) => setHotelName(e.target.value)}
                    className=' shadow-none p-1  border rounded-full'
                    type='text'
                    autoComplete='off'
                    name='hotelName'
                    id='hotelName'
                    placeholder='Hotel Name'
                  />
                </div>{' '}
                <div className='input-block  '>
                  <label className='input-label font-mono  block '>Email</label>

                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className=' shadow-none p-1  border rounded-full'
                    type='email'
                    autoComplete='off'
                    name='email'
                    id='email'
                    placeholder='Contact email'
                  />
                </div>{' '}
                <div className='input-block '>
                  <label htmlFor='rent' className='input-label font-mono block'>
                    Phone Number
                  </label>
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className=' p-1 number-input'
                    type='number'
                    autoComplete='off'
                    name='phoneNumber'
                    id='phoneNumber'
                    placeholder='phoneNumber'
                  />
                </div>
                <div className='input-block  '>
                  <label className='input-label font-mono  block '>Place</label>

                  <input
                    onChange={(e) => setPlace(e.target.value)}
                    className=' shadow-none p-1  border rounded-full'
                    type='text'
                    autoComplete='off'
                    name='place'
                    id='place'
                    placeholder='Place'
                  />
                </div>
                <div className='input-block  '>
                  <label className='input-label font-mono  block '>City</label>

                  <input
                    onChange={(e) => setCity(e.target.value)}
                    className=' shadow-none p-1  border rounded-full'
                    type='text'
                    autoComplete='off'
                    name='city'
                    id='city'
                    placeholder='city'
                  />
                </div>
                <div className='input-block  '>
                  <label className='input-label font-mono  block '>State</label>

                  <input
                    onChange={(e) => setState(e.target.value)}
                    className=' shadow-none p-1  border rounded-full'
                    type='text'
                    autoComplete='off'
                    name='state'
                    id='state'
                    placeholder='state'
                  />
                </div>
                <div className='input-block '>
                  <label htmlFor='rent' className='input-label font-mono block'>
                    Pincode
                  </label>
                  <input
                    onChange={(e) => setPincode(e.target.value)}
                    className=' p-1 number-input'
                    type='number'
                    autoComplete='off'
                    name='pincode'
                    id='pincode'
                    placeholder='pincode'
                  />
                  {/* {errors.rent && touched.rent ? (
                <p className="form-errors text-red-700">{errors.rent}</p>
              ) : null} */}
                </div>
                <div className='input-block'>
                  <label htmlFor='images' className='input-label font-mono block'>
                    Select 3 images
                  </label>
                  <input
                    onChange={(e) => {
                      setImages(e.target.files);
                      console.log(e.target.files);
                    }}
                    className='p-1 w-44'
                    type='file'
                    accept='image/*'
                    autoComplete='off'
                    name='image'
                    id='fileupload'
                    multiple
                    placeholder='Choose images '
                  />
                </div>
                <div className='input-block '>
                  <label htmlFor='rent' className='input-label font-mono block'>
                    Price / room
                  </label>
                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    className=' p-1 number-input'
                    type='number'
                    autoComplete='off'
                    name='price'
                    id='price'
                    placeholder='rent per day'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='grid  border mx-2 md:mx-10 px-10 pb-6 items-center rounded-md justify-center sm:grid-cols-2  md:grid-cols-4 gap-4 mt-10 '>
            <div className=' mt-10 w-fit h-24 flex-col relative'>
              <div className='  flex items-center justify-center mb-3'>
                <h1 className='text-gray-600'>Bed Rooms</h1>
              </div>
              <div className='h-16  flex justify-center items-center   '>
                <button
                  type='button'
                  onClick={() => setRooms(rooms == 1 ? 1 : rooms - 1)}
                  className='bg-white rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center'
                >
                  <i className='ri-subtract-line'></i>
                </button>

                <h1>{rooms}</h1>

                <button
                  type='button'
                  onClick={() => setRooms(rooms == 6 ? 6 : rooms + 1)}
                  className='bg-white rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center'
                >
                  <i className='ri-add-line'></i>
                </button>
              </div>
            </div>

            <div className=' mt-10 w-fit h-24 flex-col relative'>
              <div className='  flex items-center justify-center mb-3'>
                <h1 className='text-gray-600'>Allowed Guests / room</h1>
              </div>
              <div className='h-16  flex justify-center items-center   '>
                <button
                  type='button'
                  onClick={() => setAllowedGuests(allowedGuests == 1 ? 1 : allowedGuests - 1)}
                  className='bg-white rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center'
                >
                  <i className='ri-subtract-line'></i>
                </button>

                <h1> {allowedGuests} </h1>
                <button
                  type='button'
                  onClick={() => setAllowedGuests(allowedGuests === 3 ? 3 : allowedGuests + 1)}
                  className='bg-white rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center'
                >
                  <i className='ri-add-line'></i>
                </button>
              </div>
            </div>
            <div className=' mt-10 w-fit h-24 flex-col relative'>
              <div className='  flex items-center justify-center mb-3'>
                <h1 className='text-gray-600'>Kitchen</h1>
              </div>
              <div className='h-16  flex justify-center items-center   '>
                <button
                  type='button'
                  onClick={() => setKitchen(Kitchen == 1 ? 1 : Kitchen - 1)}
                  className='bg-white rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center'
                >
                  <i className='ri-subtract-line'></i>
                </button>

                <h1> {Kitchen} </h1>
                <button
                  type='button'
                  onClick={() => setKitchen(Kitchen === 6 ? 6 : Kitchen + 1)}
                  className='bg-white rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center'
                >
                  <i className='ri-add-line'></i>
                </button>
              </div>
            </div>
            <div className=' mt-10 w-fit h-24 flex-col relative'>
              <div className='  flex items-center justify-center mb-3'>
                <h1 className='text-gray-600'>Pool</h1>
              </div>
              <div className='h-16  flex justify-center items-center   '>
                <button
                  type='button'
                  onClick={() => setPool(pool == 1 ? 1 : pool - 1)}
                  className='bg-white rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center'
                >
                  <i className='ri-subtract-line'></i>
                </button>

                <h1> {pool} </h1>
                <button
                  type='button'
                  onClick={() => setPool(pool === 5 ? 5 : pool + 1)}
                  className='bg-white rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center'
                >
                  <i className='ri-add-line'></i>
                </button>
              </div>
            </div>
          </div>

          <div className=' justify-center grid-cols-2 border p-6 rounded-md my-10 mx-2 md:grid-cols-4 gap-4 md:m-10'>
            <div>
              <h1 className='  border-b m-2 text-blue-900 font-semibold font-mono text-xl w-fit'>Amnities</h1>
            </div>

            <div className='grid grid-cols-2  p-2  mx-2 md:grid-cols-4 gap-4 b'>
              <div className=' h-12 mt-4 flex items-start justify-start '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.internet}
                    onChange={handleCheckboxChange}
                    name='internet'
                    id='internet'
                    type='checkbox'
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>Internet</span>
                </label>
              </div>

              <div className=' h-12 mt-4 flex items-start justify-start '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.locker}
                    onChange={handleCheckboxChange}
                    name='locker'
                    id='locker'
                    type='checkbox'
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>Locker</span>
                </label>
              </div>

              <div className=' h-12 mt-4 flex items-start justify-start '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.laundry}
                    onChange={handleCheckboxChange}
                    name='laundry'
                    id='laundry'
                    type='checkbox'
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>Laundry</span>
                </label>
              </div>
              <div className=' h-12 mt-4 flex items-start justify-start '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.dryer}
                    onChange={handleCheckboxChange}
                    name='dryer'
                    id='dryer'
                    type='checkbox'
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>Dryer</span>
                </label>
              </div>
              <div className=' h-12 mt-4 flex items-start justify-start '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.privateKitchen}
                    onChange={handleCheckboxChange}
                    name='privateKitchen'
                    id='privateKitchen'
                    type='checkbox'
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>Private Kitchen</span>
                </label>
              </div>
              <div className=' h-12 mt-4 flex items-start justify-start '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.privatePool}
                    onChange={handleCheckboxChange}
                    name='privatePool'
                    id='privatePool'
                    type='checkbox'
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>Private Pool</span>
                </label>
              </div>
              <div className=' h-12 mt-4 flex items-start justify-start '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.bathTub}
                    onChange={handleCheckboxChange}
                    name='bathTub'
                    id='bathTub'
                    type='checkbox'
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>Bath Tub</span>
                </label>
              </div>
              <div className=' h-12 mt-4 flex items-start justify-start '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.antiTheftKey}
                    onChange={handleCheckboxChange}
                    name='antiTheftKey'
                    id='antiTheftKey'
                    type='checkbox'
                    className='form-checkbox h-5 w-5 text-blue-600'
                  />
                  <span className='ml-2 text-gray-600'>Anti-theft key</span>
                </label>
              </div>
            </div>
          </div>
          <div className='grid   md:grid-cols-2  md:my-10 md:mx-10 gap-4  h-auto'>
            <div className=''>
              <div className='p-2'>
                <h1 className=' border-b m-2 text-blue-900 font-semibold font-mono text-xl w-fit'>
                  Set house rules for your guests
                </h1>
                <p className='text-gray-400'>Guests must agree to your house rules before they book.</p>
              </div>
              <div className=' grid grid-cols-2 m-2 '>
                <div className='relative '>
                  <input
                    onKeyDown={handleKeyDown}
                    type='text '
                    className='border-gray-300 p-2 w-full mt-2'
                    placeholder='Select / Type Rules'
                  />
                  <ul className='absolute z-50 bg-white border-gray-300 border-2 mt-1 rounded-md w-full'>
                    <li
                      onClick={() => handleRules('No smoking in common areas ')}
                      className='px-2 py-1 border-b hover:bg-gray-100 cursor-pointer'
                    >
                      No smoking in common areas
                    </li>
                    <li
                      onClick={() => handleRules('Do not wear shoes/shoes in the house ')}
                      className='px-2 py-1 border-b hover:bg-gray-100 cursor-pointer'
                    >
                      Do not wear shoes/shoes in the house
                    </li>

                    <li
                      onClick={() => handleRules('No cooking in the bedroom ')}
                      className='px-2 py-1 border-b hover:bg-gray-100 cursor-pointer'
                    >
                      No cooking in the bedroom
                    </li>
                  </ul>
                </div>
                <div className='rules-div h-auto  min-h-full  m-2 w-full  rounded-md'>
                  <ul>
                    {rules?.map((rule, index) => (
                      <div key={index} className='flex justify-between p-1 w-full border'>
                        <li className='px-2 py-1 hover:bg-gray-100 cursor-pointer'>{rule}</li>
                        <i
                          onClick={() => deleteRule(index)}
                          className='ri-close-line border border-white rounded-sm text-2xl hover:shadow-lg hover:border-gray-400'
                        ></i>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className=''>
              <div className='p-2   h-fit mb-4'>
                <h1 className=' border-b m-2 text-blue-900 font-semibold font-mono text-xl w-fit'>
                  Your place description for client
                </h1>
                <p className='text-gray-400'>Mention the best features of your accommodation</p>
              </div>
              <div className='m-2  '>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  className='w-full   h-40 p-4 border border-gray-400 rounded-lg resize-none focus:border-blue-600 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-200'
                  placeholder='add discription about your property.....'
                ></textarea>
              </div>
              <div className=' flex justify-end  px-2'>
                <button
                  onClick={handleSubmit}
                  type='button'
                  className='border-2 outline-none border-blue-600 text-blue-600 font-medium hover:bg-blue-700 hover:text-white duration-500 rounded-lg px-6 py-2'
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HotetlRegistrationForm;
