import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { userApi } from '../../../api/userApi';

function PrivateRoute() {
  const navigate = useNavigate();
  const [userCheck, setUserCheck] = useState(false);
  useEffect(() => {
    userApi
      .get('/authenticate')
      .then((response) => {
        if (response.data.authorization) {
          setUserCheck(true);
        } else {
          setUserCheck(false);
          navigate('/login');
        }
      })
      .catch(() => {
        setUserCheck(false);
        navigate('/login');
      });
  }, []);

  return userCheck && <Outlet />;
}

export default PrivateRoute;
