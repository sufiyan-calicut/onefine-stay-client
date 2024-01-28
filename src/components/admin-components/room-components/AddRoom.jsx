import React, { useRef, useState } from 'react';
import Layout from '../Layout';
import {adminApi} from '../../../api/adminApi';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function AddRoom() {
  const formRef = useRef(null);

  // states of counts
  let [roomName, setRoomName] = useState('');
  let [category, setCategory] = useState('');
  let [price, setPrice] = useState();
  let [images, setImages] = useState([]);
  let [numberofBeds, setNumberofBeds] = useState(1);
  let [numberOfRooms, setNumberofRooms] = useState(1);
  let [numberofStayDays, setNumberofStayDays] = useState(1);
  let [allowedGuests, setAllowedGuests] = useState(1);
  let [rules, setRules] = useState([]);
  let [description, setDescription] = useState('');
  let [url, setUrl] = useState([]);

  // check box state

  let [checkboxes, setCheckboxes] = useState({
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
    setCheckboxes((prevCheckboxes) => ({ ...prevCheckboxes, [name]: checked }));
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

  const roomData = {
    roomName,
    category,
    price: parseInt(price),
    url,
    checkboxe: Object.keys(checkboxes).filter((key) => checkboxes[key]),
    numberofBeds,
    numberOfRooms,
    numberofStayDays,
    allowedGuests,
    rules,
    description,
  };

  const resetForm = () => {
    setNumberofBeds(1);
    setNumberofRooms(1);
    setNumberofStayDays(1);
    setAllowedGuests(1);
    setRules([]);
    setCheckboxes([
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
    let imageUrl = [];
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('file', images[i]);
      formData.append('upload_preset', 'mistyvilla');

      await axios.post('https://api.cloudinary.com/v1_1/dvxbonwol/image/upload', formData).then((response) => {
        const newurl = response.data.url;
        imageUrl = [...imageUrl, newurl];
      });
    }



    const response = await adminApi.post(
      '/add-room',
      { roomData, imageUrl },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      formRef.current.reset();
      resetForm();
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <Layout>
      <div
        className=' overflow-x-auto  mx-auto my-auto h-full w-full text-lg     px-10 py-10
       block'
      >
        <div className=' mb-6  border-b w-fit p-2'>
          <h1 className='text-xl font-mono text-green-900 '>Add new rooms</h1>
        </div>
        <form ref={formRef} className='  text-sm text-green-900' id='form'>
          <div className='grid grid-cols-4 gap-4 mt-10'>
            <div className='input-block  '>
              <label className='input-label font-mono  block '>Room Name</label>

              <input
                onChange={(e) => setRoomName(e.target.value)}
                className=' shadow-none p-1  border rounded-full'
                type='roomName'
                autoComplete='off'
                name='roomName'
                id='roomName'
                placeholder='Give a unique name '
              />
              {/* {errors.roomName && touched.roomName ? (
                <p className="form-errors text-red-700">{errors.roomName}</p>
              ) : null} */}
            </div>

            <div className='input-block '>
              <label htmlFor='' className='input-label font-mono block '>
                Category
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className=' px-4 py-2 border-2 border-gray-300 focus:outline-none'
                name='category'
                id='category'
              >
                <option value='category'>Choose a category</option>

                <option value='deluxe'>Deluxe</option>
                <option value='supreme'>Supreme</option>
                <option value='suite'>Suite</option>
              </select>
              {/* {errors.category && touched.category ? (
                <p className="form-errors text-red-700">{errors.category}</p>
              ) : null} */}
            </div>

            <div className='input-block '>
              <label htmlFor='rent' className='input-label font-mono block'>
                Rent
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                className=' p-1 number-input'
                type='number'
                autoComplete='off'
                name='rent'
                id='rent'
                placeholder='Set rent per day'
              />
              {/* {errors.rent && touched.rent ? (
                <p className="form-errors text-red-700">{errors.rent}</p>
              ) : null} */}
            </div>

            <div className='input-block'>
              <label htmlFor='password' className='input-label font-mono block'>
                Select images
              </label>
              <input
                onChange={(e) => setImages(e.target.files)}
                className='p-1 w-44'
                type='file'
                accept='image/*'
                autoComplete='off'
                name='image'
                id='fileupload'
                multiple
                placeholder='Choose images '
              />
              {/* {errors.password && touched.password ? (
                <p className="form-errors text-red-700">{errors.password}</p>
              ) : null} */}
            </div>
          </div>

          <div className='grid grid-cols-4 gap-4 mt-10'>
            <div className=' mt-10 w-fit h-24 flex-col relative'>
              <div className='  flex items-center justify-center mb-3'>
                <h1 className=''>Number of Beds</h1>
              </div>
              <div className='h-16  flex justify-center items-center   '>
                <button
                  type='button'
                  onClick={() => {
                    setNumberofBeds(numberofBeds == 1 ? 1 : numberofBeds - 1);
                  }}
                  className='bg-white sm:rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center font-medium'
                >
                  <i className='ri-subtract-line'></i>
                </button>

                <h1>{numberofBeds}</h1>

                <button
                  type='button'
                  onClick={() => setNumberofBeds(numberofBeds + 1)}
                  className='bg-white rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center'
                >
                  <i className='ri-add-line'></i>
                </button>
              </div>
            </div>

            <div className=' mt-10 w-fit h-24 flex-col relative'>
              <div className='  flex items-center justify-center mb-3'>
                <h1 className=''>Allowed Guests</h1>
              </div>
              <div className='h-16  flex justify-center items-center   '>
                <button
                  type='button'
                  onClick={() => setAllowedGuests(allowedGuests == 1 ? 1 : allowedGuests - 1)}
                  className='bg-white sm:rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center font-medium'
                >
                  <i className='ri-subtract-line'></i>
                </button>

                <h1> {allowedGuests} </h1>
                <button
                  type='button'
                  onClick={() => setAllowedGuests(allowedGuests + 1)}
                  className='bg-white rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center'
                >
                  <i className='ri-add-line'></i>
                </button>
              </div>
            </div>
            <div className=' mt-10 w-fit h-24 flex-col relative'>
              <div className='  flex items-center justify-center mb-3'>
                <h1 className=''>Number of Rooms</h1>
              </div>
              <div className='h-16  flex justify-center items-center   '>
                <button
                  type='button'
                  onClick={() => setNumberofRooms(numberOfRooms == 1 ? 1 : numberOfRooms - 1)}
                  className='bg-white sm:rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center font-medium'
                >
                  <i className='ri-subtract-line'></i>
                </button>

                <h1> {numberOfRooms} </h1>
                <button
                  type='button'
                  onClick={() => setNumberofRooms(numberOfRooms + 1)}
                  className='bg-white rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center'
                >
                  <i className='ri-add-line'></i>
                </button>
              </div>
            </div>
            <div className=' mt-10 w-fit h-24 flex-col relative'>
              <div className='  flex items-center justify-center mb-3'>
                <h1 className=''>Minimum stay days</h1>
              </div>
              <div className='h-16  flex justify-center items-center   '>
                <button
                  type='button'
                  onClick={() => setNumberofStayDays(numberofStayDays == 1 ? 1 : numberofStayDays - 1)}
                  className='bg-white sm:rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center font-medium'
                >
                  <i className='ri-subtract-line'></i>
                </button>

                <h1> {numberofStayDays} </h1>
                <button
                  type='button'
                  onClick={() => setNumberofStayDays(numberofStayDays + 1)}
                  className='bg-white rounded-full w-11 h-11 border-2 hover:shadow-xl hover:border-3  hover:duration-300 mx-4 flex items-center justify-center'
                >
                  <i className='ri-add-line'></i>
                </button>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-4 gap-4 m-10'>
            <div className=' h-12 mt-4 flex items-start justify-start '>
              <label htmlFor='checkbox' className='flex items-center gap-3'>
                <input
                  checked={checkboxes.locker}
                  onChange={handleCheckboxChange}
                  name='locker'
                  id='locker'
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <span className='ml-2 text-gray-700'>Internet</span>
              </label>
            </div>
            <div className=' h-12 mt-4 flex items-start justify-start '>
              <label htmlFor='checkbox' className='flex items-center gap-3'>
                <input
                  checked={checkboxes.internet}
                  onChange={handleCheckboxChange}
                  name='internet'
                  id='internet'
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <span className='ml-2 text-gray-700'>Internet</span>
              </label>
            </div>
            <div className=' h-12 mt-4 flex items-start justify-start '>
              <label htmlFor='checkbox' className='flex items-center gap-3'>
                <input
                  checked={checkboxes.laundry}
                  onChange={handleCheckboxChange}
                  name='laundry'
                  id='laundry'
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <span className='ml-2 text-gray-700'>Laundry</span>
              </label>
            </div>
            <div className=' h-12 mt-4 flex items-start justify-start '>
              <label htmlFor='checkbox' className='flex items-center gap-3'>
                <input
                  checked={checkboxes.dryer}
                  onChange={handleCheckboxChange}
                  name='dryer'
                  id='dryer'
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <span className='ml-2 text-gray-700'>Dryer</span>
              </label>
            </div>
            <div className=' h-12 mt-4 flex items-start justify-start '>
              <label htmlFor='checkbox' className='flex items-center gap-3'>
                <input
                  checked={checkboxes.privateKitchen}
                  onChange={handleCheckboxChange}
                  name='privateKitchen'
                  id='privateKitchen'
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <span className='ml-2 text-gray-700'>Private Kitchen</span>
              </label>
            </div>
            <div className=' h-12 mt-4 flex items-start justify-start '>
              <label htmlFor='checkbox' className='flex items-center gap-3'>
                <input
                  checked={checkboxes.privatePool}
                  onChange={handleCheckboxChange}
                  name='privatePool'
                  id='privatePool'
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <span className='ml-2 text-gray-700'>Private Pool</span>
              </label>
            </div>
            <div className=' h-12 mt-4 flex items-start justify-start '>
              <label htmlFor='checkbox' className='flex items-center gap-3'>
                <input
                  checked={checkboxes.bathTub}
                  onChange={handleCheckboxChange}
                  name='bathTub'
                  id='bathTub'
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <span className='ml-2 text-gray-700'>Bath Tub</span>
              </label>
            </div>
            <div className=' h-12 mt-4 flex items-start justify-start '>
              <label htmlFor='checkbox' className='flex items-center gap-3'>
                <input
                  checked={checkboxes.antiTheftKey}
                  onChange={handleCheckboxChange}
                  name='antiTheftKey'
                  id='antiTheftKey'
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <span className='ml-2 text-gray-700'>Anti-theft key</span>
              </label>
            </div>
          </div>
          <div className='grid grid-cols-2  mt-12 gap-4 h-auto'>
            <div className='  '>
              <div className='p-2'>
                <h1 className=' border-b m-2 text-green-900 font-semibold font-mono text-xl w-fit'>
                  Set house rules for your guests
                </h1>
                <p>Guests must agree to your house rules before they book.</p>
              </div>
              <div className=' grid grid-cols-2 m-2'>
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
                <div className='h-auto min-h-full  m-2 w-full  rounded-md'>
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
              <div className='p-2  h-fit mb-4'>
                <h1 className=' border-b m-2 text-green-900 font-semibold font-mono text-xl w-fit'>
                  Your place description for client
                </h1>
                <p>Mention the best features of your accommodation</p>
              </div>
              <div className='m-2  '>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  className='w-full   h-40 p-4 border border-gray-400 rounded-lg resize-none focus:border-green-600 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-200'
                  placeholder='add discription about your property.....'
                ></textarea>
              </div>
              <div className=' flex justify-end  px-2'>
                <button
                  onClick={handleSubmit}
                  type='button'
                  className='border-2 outline-none border-green-600 text-green-600 font-medium hover:bg-green-700 hover:text-white duration-500 rounded-lg px-6 py-2'
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddRoom;
