import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../api/adminApi';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../reduxToolkit/alertsReducer.js';

function AdminAuth() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [admin, setAdmin] = useState(false);
  useEffect(() => {
    dispatch(showLoading());

    adminApi
      .get('/admin-auth')
      .then(() => {
        dispatch(hideLoading());
        setAdmin(true);
      })
      .catch((error) => {
        dispatch(hideLoading());
        localStorage.removeItem('adminToken');

        navigate('/admin');
      });
  }, []);

  return admin && <Outlet />;
}

export default AdminAuth;
