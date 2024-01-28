import React, { useEffect, useState } from 'react';
import Navbar from '../partials/header/Navbar';
import Footer from '../partials/footer/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { userApi } from '../../../api/userApi';
import { showLoading, hideLoading } from '../../../reduxToolkit/alertsReducer';
import skeltlonLoader from '../../commonFiles/skeltlonLoader';
import { useDispatch, useSelector } from 'react-redux';
import { RxCrossCircled } from 'react-icons/rx';
import { BsStar } from 'react-icons/bs';
import { MdCurrencyRupee } from 'react-icons/md';
import { toast } from 'react-hot-toast';

// import  {Razorpay}  from 'razorpay';

function SingleRoom() {
  let searchData = useSelector((state) => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [hotel, setHotel] = useState();
  const [position, setPosition] = useState(0);
  const [wallet, setWallet] = useState(0);
  useEffect(() => {
    // dispatch(showLoading());
    const getData = async () => {
      // dispatch(showLoading());
      await userApi
        .post('/fetch-single-room-data', { id: location.state })
        .then((response) => {
          console.log(response, 'response tester');
          setWallet(response?.data.wallet.balance);
          setHotel(response?.data?.data);
        })
        .catch((err) => {
          console.log(err);
          dispatch(hideLoading());
        });
    };

    getData();
  }, []);
  let count = 0;
  const handleLoading = () => {
    count += 1;
    if (count == 4) dispatch(hideLoading());
  };

  const day = searchData?.checkInDate;
  const chek = searchData?.checkOutDate;
  const checkinDate = new Date(day);
  const checkoutDate = new Date(chek);
  // Calculate the difference in milliseconds
  const diffInMs = checkoutDate - checkinDate;

  // Convert the difference to days
  const totalStayDays = diffInMs / (1000 * 60 * 60 * 24);

  const room = searchData?.roomCounts;
  let guest = [...searchData.guestCounts];

  guest = guest?.map((element) => parseInt(element));

  const totalGuest = guest?.reduce((acc, curr) => {
    return acc + parseInt(curr);
  }, 0);

  const totalPrice = totalStayDays * (room * hotel?.price);

  let cashTobePay = Math.max(totalPrice - wallet, 0);
  let walletPayment = Math.max(totalPrice - cashTobePay, 0);

  const handleBooking = async () => {
    try {
      if (cashTobePay <= 0) {
        const data = {
          hotelId: hotel?._id,
          checkInDate: searchData?.checkInDate,
          checkOutDate: searchData?.checkOutDate,
          totalStayDays,
          totalGuest,
          totalRooms: searchData?.roomCounts,
          singleRoomPrice: hotel?.price,
          totalPrice,
          paidByCash: cashTobePay,
          paidByWallet: walletPayment,
        };
        userApi
          .post('/walletPayment', { data })
          .then((response) => {
            toast.success(response.data.message);
            navigate('/booking-success', { state: response.data.data });
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      } else {
        await userApi
          .post('/initializePayment', {
            cashTobePay,
            hotelId: hotel?._id,
            checkInDate: searchData?.checkInDate,
            totalRooms: searchData?.roomCounts,
          })
          .then((response) => {
            handleRazorpay(response.data.order);
          })
          .catch((error) => {
            console.log(error);
            toast.dismiss();
            toast.error(error.response.data.message);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRazorpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Roomie.com',
      order_id: order.id,
      handler: async function (response) {
        const data = {
          hotelId: hotel?._id,
          checkInDate: searchData?.checkInDate,
          checkOutDate: searchData?.checkOutDate,
          totalStayDays,
          totalGuest,
          totalRooms: searchData?.roomCounts,
          singleRoomPrice: hotel?.price,
          totalPrice,
          paidByCash: cashTobePay,
          paidByWallet: totalPrice - cashTobePay,
        };
        userApi
          .post('/verifyPayment', { data, response })
          .then((response) => {
            toast.success(response.data.message);
            navigate('/booking-success', { state: response.data.data });
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Navbar />
      <div className='main div   w-full h-full md:mt-20 left-0 right-0'>
        <div className={'md:h-[30rem] flex flex-col md:flex-row bg-yellow-20 gap-1 md:mx-28 md:p-8 p-2 mb-0 m-4 '}>
          <div className='largeImage w-full md:w-3/4  md:h-full bg-orange-30'>
            {hotel?.images ? (
              <img
                onLoad={handleLoading}
                src={hotel?.images[position]}
                alt='Large Image'
                className='h-full w-full border r'
                loading='lazy'
              />
            ) : (
              <div className='w-full  h-full m-auto catalog-product '>
                <div className='border border-gray-200 p-4  w-full h-full left-0 right-0 mx-auto'>
                  <div className='animate-pulse space-y-2'>
                    <div className='bg-gray-200 h-48 w-full'></div>
                    <div className='flex-1 space-y-2'>
                      <div className='h-6 md:h-20 bg-gray-200 w-full'></div>
                      <div className='h-6 md:h-20 bg-gray-200 w-full'></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='imageOptions flex flex-row md:flex-col gap-0.5 md:w-1/4 h-1/4 md:h-full  '>
            <div className='optionOne w-1/3 md:w-2/3 h-24  md:h-1/3'>
              {hotel?.images ? (
                <img
                  onLoad={handleLoading}
                  src={hotel?.images[0]}
                  alt='Large Image'
                  onClick={() => setPosition(0)}
                  className='h-full w-full'
                  loading='lazy'
                />
              ) : (
                <div className='w-full  h-full m-auto catalog-product '>
                  <div className='border border-gray-200 p-4  w-full h-full left-0 right-0 mx-auto'>
                    <div className='animate-pulse space-y-2 h-full'>
                      <div className='bg-gray-200 h-2/3 w-full'></div>
                      <div className='flex-1 space-y-2'>
                        <div className='h-6 bg-gray-200 w-full'></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='optionTwo w-1/3 md:w-2/3 h-24 md:h-1/3'>
              {hotel?.images ? (
                <img
                  onLoad={handleLoading}
                  src={hotel?.images[1]}
                  alt='Large Image'
                  onClick={() => setPosition(1)}
                  className='h-full w-full'
                  loading='lazy'
                />
              ) : (
                <div className='w-full  h-full m-auto catalog-product '>
                  <div className='border border-gray-200 p-4  w-full h-full left-0 right-0 mx-auto'>
                    <div className='animate-pulse space-y-2 h-full'>
                      <div className='bg-gray-200 h-2/3 w-full'></div>
                      <div className='flex-1 space-y-2'>
                        <div className='h-6 bg-gray-200 w-full'></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='optionThree w-1/3 md:w-2/3 h-24 md:h-1/3'>
              {hotel?.images ? (
                <img
                  onLoad={handleLoading}
                  src={hotel?.images[1]}
                  alt='Large Image'
                  onClick={() => setPosition(1)}
                  loading='lazy'
                  className='h-full w-full'
                />
              ) : (
                <div className='w-full  h-full m-auto catalog-product '>
                  <div className='border border-gray-200 p-4  w-full h-full left-0 right-0 mx-auto'>
                    <div className='animate-pulse space-y-2 h-full'>
                      <div className='bg-gray-200 h-2/3 w-full'></div>
                      <div className='flex-1 space-y-2'>
                        <div className='h-6 bg-gray-200 w-full'></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='center-div   flex flex-col md:flex-row  h-auto gap-6 mt-0  m-3 md:p-4  md:my-4 md:mx-16    '>
          <div className='largeImage   md:w-4/6 h-3/4 md:h-full    '>
            <div className='  leading-loose mb-4 border rounded-md border-cyan-800 h-auto my-10 md:p-10 p-4 overflow-auto  '>
              <h1 className='text-3xl font-  border-cyan-700 mb-4  w-fit font-sans text-cyan-900'>
                {hotel?.hotelName}
              </h1>
              <p className='text-gray-600  '>{hotel?.description}</p>
            </div>
            <div className='  h-1/2 my-4 md:my-10 md:p-10 p-4 leading-10 border rounded-md border-cyan-800 '>
              <h1 className='text-xl md:font-semibold   w-fit text-cyan-900'>Amnities</h1>
              <div className='grid gap-4 m-6 grid-cols-2 md:grid-cols-4 items-center justify-around text-gray-600'>
                {hotel?.amnities.map((amnity, i) => {
                  return (
                    <div key={i} className='flex  items-center gap-2'>
                      <BsStar />
                      <p>{amnity}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=' mt-4 md:mt-10 gap-2  h-1/2 md:p-10 p-2 leading-10 border rounded-md border-cyan-800 '>
              <h1 className='text-xl font-semibold   w-fit text-cyan-900 '>Rules for guests</h1>
              <div className='flex flex-col gap-4 m-6  text-gray-600'>
                {hotel?.rules.map((rule, i) => {
                  return (
                    <div key={i} className='flex gap-2 items-center'>
                      <RxCrossCircled />
                      <p>{rule}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='md:booking   sticky top-10  tracking-wider  flex flex-row  md:flex-col   md:w-2/6 h-full  md:h-screen  rounded-3xl border-gray-100 '>
            <div className='sticky top-20 h-fit w-/4 bg-gray-5 border left-0 right-0 mx-auto md:mx-1 md:mt-16  shadow-lg rounded-md p-2'>
              <div className=' flex flex-row justify-between m-4'>
                <h1 className='text-sm md:text-xl font-semibold  '>
                  <span className='flex items-center p-2'>
                    {' '}
                    <MdCurrencyRupee />
                    {hotel?.price} <span className='text-gray-500 font-thin'>/night</span>
                    <span className='text-gray-600 text-end text-sm bg-gray-400 '> </span>
                  </span>
                </h1>
                <h4 className=''>{/* * 4.5 <span className='font-thin text-gray-600 right-'>(453)</span> */}</h4>
              </div>
              <div className='flex flex-col bg-gray-20 h-40  gap-3 '>
                <div className=' p-2 my-3 flex flex-col left-0 right-0 mx-auto rounded-lg border   justify-around'>
                  <div className='p-2 border-b h-10 md:font-semibold flex text-xs items-center tracking-wider px-6  text-gray-600 '>
                    {totalStayDays} Days , {totalGuest} Guests , {room} Room
                  </div>
                  <div className='p-2 h-10  flex text-xs items-center tracking-wider px-6 text-gray-600 '>
                    {searchData?.checkInDate} - {searchData.checkOutDate}
                  </div>
                </div>
                <div className=' flex items-center px-6 font-sm my-4 '>
                  <h1 className='flex items-center px-2  w-fit'>Total</h1>
                  <span className='  w-full flex items-center  '>
                    {' '}
                    <MdCurrencyRupee />
                    {totalPrice}
                  </span>
                  <h1>wallet:{wallet}</h1>
                </div>
              </div>
              <h1 className='px-5 tracking-tight mt-8 mx-3'>
                Cash to be pay: <span className='text-red-900'>{cashTobePay > 0 ? cashTobePay : 0}</span>
              </h1>
              <div className='bg-blac p-4 flex justify-center '>
                <button
                  className='bg-blue-700 shadow-transparent-xl hover:bg-blue-900 duration-300 text-gray-50 w-full p-2 rounded-md border font-sans tracking-widest font-medium'
                  onClick={handleBooking}
                >
                  Book Now
                </button>
              </div>
            </div>{' '}
          </div>
        </div>
        <div className='w-3/4 h-auto  p-8  '></div>
        <Footer />
      </div>
    </>
  );
}

export default SingleRoom;
