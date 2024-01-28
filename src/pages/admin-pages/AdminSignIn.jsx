import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../reduxToolkit/alertsReducer';
import { adminApi } from '../../api/adminApi';

function AdminSignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await adminApi.post('/admin-sign-in', values);

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('adminToken', response.data.data);
        navigate('/admin/dashboard');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

      toast.error('something went wrong');
    }
  };
  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
        <h1 className='card-title'>Admin Roomie.com</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label='Email' name='email'>
            <Input placeholder='email' />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input placeholder='password' type='password' />
          </Form.Item>
          <Button className='primary-button my-2' htmlType='submit'>
            SIGN IN
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AdminSignIn;
