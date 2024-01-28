import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/user-components/register-and-login/Login';
import OtpPage from './components/user-components/register-and-login/otp';
import Home from './pages/user-pages/home-page/Home';
import RegisterPage from './pages/user-pages/register-page/RegisterPage';
import AdminSignIn from './pages/admin-pages/AdminSignIn';
import AdminHome from './pages/admin-pages/AdminHome';
import UsersList from './pages/admin-pages/UsersList copy';
import AdminAuth from './components/admin-components/Auth/AdminAuth';
import ForgetPasswordForm from './components/user-components/register-and-login/ForgetPasswordForm';
import OtpReset from './components/user-components/register-and-login/OtpReset';
import ResetPasswordForm from './components/user-components/register-and-login/ResetPasswordForm';
import DisplayRoomsPage from './pages/user-pages/rooms/DisplayRoomsPage';
import SingleRoom from './components/user-components/Rooms/SingleRoom';
import HotelSignIn from './components/hotel-components/HotelSignIn';
import HotelRegistrationForm from './components/hotel-components/HotelRegistrationForm';
import HotelManagement from './pages/admin-pages/HotelManagement';
import SingleRequests from './components/admin-components/room-components/SingleRequests';
import CongratsMessage from './components/hotel-components/CongratsMessage';
import SelectorComponent from './components/hotel-components/SelectorComponent';
import PublicRoute from './components/user-components/AuthComponents/PublicRoute';
import PrivateRoute from './components/user-components/AuthComponents/PrivateRoute';
import AdminPublicRoutes from './components/admin-components/Auth/AdminPublicRoutes';
import HotelPublicRoutes from './components/hotel-components/hotelAuthComponents/HotelPublicRoutes';
import HotelPrivateRoutes from './components/hotel-components/hotelAuthComponents/HotelPrivate';
import BookingSuccess from './components/user-components/Rooms/BookingSuccess';
import BookingSelector from './components/admin-components/Booking/BookingSelector.jsx';
import Profile from './components/user-components/Profile/Profile';
import Sales from './components/admin-components/Sales/Sales';
// import PaymentForm from './components/user-components/Booking/PaymentForm';
import PageNoteFount from './components/pageNotFound/PageNoteFount';
import Wallet from './components/user-components/wallet/Wallet';
import MobileScreenDisplayRooms from './components/user-components/Rooms/MobileScreenDisplayRooms';

function App() {
  const { loading } = useSelector((state) => state.alerts);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
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
  return (
    <Router>
      {/* .........................................LOADER COMPONENT....................................... */}
      {loading && (
        <div className='spinner-parent '>
          <div className='w-12 h-12 rounded-full animate-spin border-2 border-solid border-blue-500 border-t-transparent shadow-md '></div>
        </div>
      )}

      {/*...............................................TOAST COMPONENT................................  */}
      <Toaster position='top-center' reverseOrder={false} />

      <Routes>
        {/* .........................................USER PUBLIC COMPONENTS............................................ */}

        {/* <Route path='/donot' element={<DonutChart />} />
        <Route path='/candle' element={<CandleStickChart />} /> */}
        <Route element={<PublicRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/otp' element={<OtpPage />} />
          <Route path='/forget-password' element={<ForgetPasswordForm />} />
          <Route path='/otp-reset' element={<OtpReset />} />
          <Route path='/set-new-password' element={<ResetPasswordForm />} />
        </Route>

        {/* .........................................USER PRIVATE COMPONENTS............................................ */}
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/display-rooms' element={isMobile ? <MobileScreenDisplayRooms /> : <DisplayRoomsPage />} />
          <Route path='/single-room-details' element={<SingleRoom />} />
          <Route path='/booking-success' element={<BookingSuccess />} />
          {/* <Route path='payment-form' element={<PaymentForm />} /> */}
        </Route>

        {/*..................................ADMIN PUBLIC COMPONENTS........................................... */}

        <Route element={<AdminPublicRoutes />}>
          <Route path='/admin' element={<AdminSignIn />} />
        </Route>

        {/*..................................ADMIN PUBLIC COMPONENTS........................................... */}

        <Route element={<AdminAuth />}>
          <Route path='/admin/hotel-management' element={<HotelManagement />} />
          <Route path='/admin/single-request' element={<SingleRequests />} />
          <Route path='/admin/dashboard' element={<AdminHome />} />
          <Route path='/admin/userslist' element={<UsersList />} />
          <Route path='/admin/booking-management' element={<BookingSelector />} />
          <Route path='/admin/sales-report' element={<Sales />} />
        </Route>

        {/*...........................................HOTEL PUBLIC COMPONENTS...................................*/}

        <Route path='/hotel-register-form' element={<HotelRegistrationForm />} />
        <Route element={<HotelPublicRoutes />}>
          <Route path='/hotel' element={<HotelSignIn />} />
          <Route path='/hotel/greatings' element={<CongratsMessage />} />
        </Route>

        {/* ...........................................HOTEL PRIVATE ROUTES............................. */}

        <Route element={<HotelPrivateRoutes />}>
          <Route path='/hotel/hotel-dashboard' element={<SelectorComponent />} />
        </Route>

        {/* ...........................................404 COMPONENT..................................... */}

        <Route path='*' element={<PageNoteFount />} />
      </Routes>
    </Router>
  );
}

export default App;
