import React from 'react';

function CongratsMessage() {
  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-br from-purple-400 via-blue-900 to-blue-500'>
      <div className='bg-white rounded-lg p-10 shadow-lg'>
        <p className='text-center text-3xl font-bold text-purple-600 mb-6'>Congratulations!!!</p>
        <p className='text-center font-semibold text-lg text-blue-700 leading-7 mb-2'>
          Your request has been sent to the admin.{' '}
        </p>
        <p className='text-gray-800 text-center'>Please check your email after 24 hours for a response.</p>
        <p className='text-gray-800 text-center'>Thank you.</p>
      </div>
    </div>
  );
}

export default CongratsMessage;
