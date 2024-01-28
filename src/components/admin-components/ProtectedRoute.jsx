import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { userApi } from '../../api/userApi';
import { setUser } from '../redux/userSlice';
import { hideLoading, showLoading } from '../redux/alertReducer';
function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await userApi.post('/admin/get-user-info-by-id');
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear();
        navigate('/login');
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      navigate('/login');
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  if (localStorage.getItem('token')) {
    // eslint-disable-next-line react/prop-types
    return props.children;
  } else {
    return <Navigate to='/login' />;
  }
}

export default ProtectedRoute;
