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
            REGISTER YOUR HOTEL IN <span className=' text-blue-900'>Roomie-com</span>
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
                    onChange={(e) => {setImages(e.target.files) ; console.log(e.target.files)}}
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
