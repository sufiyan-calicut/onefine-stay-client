import React, { useEffect, useState } from 'react';
import { hotelApi } from '../../../api/hotelApi';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../reduxToolkit/alertsReducer.js';

function HotelPrivateRoutes() {
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
      })
      .catch((error) => {

        setHotel(false);
        dispatch(hideLoading());
        navigate('/hotel');
      });
  }, []);

  return hotel && <Outlet />;
}

export default HotelPrivateRoutes;
