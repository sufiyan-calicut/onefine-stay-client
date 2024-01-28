import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../api/adminApi';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../reduxToolkit/alertsReducer.js';

function AdminPublicRoutes() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [admin, setAdmin] = useState();
  useEffect(() => {
    dispatch(showLoading());

    adminApi
      .get('/admin-auth')
      .then(() => {
        dispatch(hideLoading());
        setAdmin(true);
        navigate('/admin/dashboard');
      })
      .catch((error) => {
        dispatch(hideLoading());

        setAdmin(false);
      });
  }, []);

  return admin == false && <Outlet />;
}

export default AdminPublicRoutes;
