import React from 'react';
import Layout from '../Layout';
import { useNavigate } from 'react-router-dom';

function SingleRequests() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className='  bg-black text-white w-screen h-full'>
        <button onClick={() => navigate('/admin/hotel-management')} className='rounded-lg bg-blue-900  px-6 py-2 m-2'>
          back
        </button>

        <div className=''>Single request</div>
      </div>
    </Layout>
  );
}

export default SingleRequests;
