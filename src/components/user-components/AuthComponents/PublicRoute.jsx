import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { userApi } from '../../../api/userApi';

function PublicRoute() {
  const navigate = useNavigate();
  const [userCheck, setUserCheck] = useState(false);
  useEffect(() => {
    userApi
      .get('/authenticate')
      .then((response) => {
        if (response.data.authorization) {
          setUserCheck(true);
          navigate('/');
        } else {
          setUserCheck(false);
        }
      })
      .catch(() => {
        setUserCheck(false);
      });
  }, []);

  return userCheck == false && <Outlet />;
}

export default PublicRoute;
