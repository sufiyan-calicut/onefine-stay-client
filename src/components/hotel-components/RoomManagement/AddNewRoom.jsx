import axios from 'axios';
import React, { useState } from 'react';
import { hotelApi } from '../../../api/hotelApi';
import { toast } from 'react-hot-toast';
import { useRef } from 'react';
import { hideLoading, showLoading } from '../../../reduxToolkit/alertsReducer';
import { useDispatch } from 'react-redux';

function AddNewRoom() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  let [images, setImages] = useState([]);
  let [roomNumber, setRoomNumber] = useState();
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

  const resetForm = () => {
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
    event.preventDefault();
    if (images.length == 0 || !roomNumber || amnities.length == 0) {
      return toast.error('ensure all data is given');
    }
    let imageUrl = [];
    dispatch(showLoading());
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('file', images[i]);
      formData.append('upload_preset', 'mistyvilla');

      await axios.post('https://api.cloudinary.com/v1_1/dvxbonwol/image/upload', formData).then((response) => {
        const newurl = response.data.url;
        imageUrl = [...imageUrl, newurl];
      });
    }
    let Data = {
      roomNumber,
      amnities: Object.keys(amnities).filter((key) => amnities[key]),
      hotelId: localStorage.getItem('hotelId'),
    };

    await hotelApi
      .post('/addNewRoom', {
        Data,
        imageUrl,
      })
      .then((response) => {
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          formRef.current.reset();
          resetForm();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        dispatch(hideLoading());
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className=''>
      <div className='grid h-auto w-10/12 '>
        <form ref={formRef}>
          <div className='justify-center  grid-cols-2 border p-6 rounded-md my-10 mx-10 md:grid-cols-3 gap-4 md:m-10 '>
            <label htmlFor=''>RoomNumber</label>
            <input
              type='text'
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className='text-center m-2 '
            />
            {/* <label>Number of Beds</label>
            <input type='text' className='text-center m-2'  onChange={(e)=>setBeds(e.target.value)}/> */}

            <label htmlFor='images' className=' font-mono m-4 '>
              Select 3 images
            </label>
            <input
              onChange={(e) => setImages(e.target.files)}
              className='p-1 w-52'
              type='file'
              accept='image/*'
              autoComplete='off'
              name='image'
              id='fileupload'
              multiple
              placeholder='Choose images '
            />

            <div>
              <h1 className='  border-b m-2 text-blue-900 font-semibold font-mono text-xl '>Amnities</h1>
            </div>

            <div className='grid grid-cols-2  p-2  mx-2 md:grid-cols-2 gap-4 b'>
              <div className=' h-12 mt-4 flex items-start justify-start '>
                <label htmlFor='checkbox' className='flex items-center gap-3'>
                  <input
                    checked={amnities.internet}
                    onChange={handleCheckboxChange}
                    name='internet'
                    id='internet'
                    type='checkbox'
                    className='form-checkbox h-5 w-5  text-blue-600'
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
            <button
              onClick={handleSubmit}
              className='float-right m-10 bg-blue-700 p-2 rounded-md text-gray-100 hover:shadow-lg hover:bg-blue-900'
            >
              Done
            </button>
          </div>
        </form>
      </div>{' '}
    </div>
  );
}

export default AddNewRoom;
