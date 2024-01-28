import React, { useEffect, useState } from 'react';
import { hotelApi } from '../../../api/hotelApi';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../reduxToolkit/alertsReducer.js';

function HotelPublicRoutes() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [hotel, setHotel] = useState();
  useEffect(() => {
    dispatch(showLoading());

    hotelApi
      .get('/hotel-auth')
      .then(() => {
        dispatch(hideLoading());
        setHotel(true);
        navigate('/hotel/hotel-dashboard');
      })
      .catch((error) => {
        setHotel(false);
        dispatch(hideLoading());
       
      });
  }, []);

  return hotel == false && <Outlet />;
}

export default HotelPublicRoutes;
