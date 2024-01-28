import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import { BsCloudDownload } from 'react-icons/bs';
import { hotelApi } from '../../../api/hotelApi';
import { toast } from 'react-hot-toast';

const Sales = () => {
  const [selectedPeriods, setSelectedPeriods] = useState('day');
  const [data, setData] = useState([]);

  useEffect(() => {
    hotelApi
      .post('/fetch-sales-data', { day: 'day' })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {

        toast.error(error.response.data.message);
      });
  }, []);

  const handleDownloadClick = () => {
    const element = document.getElementById('table'); // Replace "table" with the ID of your table
    html2pdf(element, {
      margin: 1,
      filename: 'sales-report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    });
  };

  const handleSearchData = async (day) => {
    try {
      const response = await hotelApi.post('/fetch-sales-data', { day });
      setData(response.data);
    } catch (error) {

      toast.error(error.response.data.message);
    }
  };
  return (
    <div className=''>
      <div className='flex flex-col '>
        <button
          className='flex w-fit items-center gap-2 border px-4 py-2 m-4 bg-gradient-to-br from-red-900  to-rose-500 text-gray-200 hover:border-red-900 duration-300 hover:bg-gray-50'
          onClick={handleDownloadClick}
        >
          Download Report <BsCloudDownload />{' '}
        </button>
        <div className='bg-blac flex gap-8 items-center justify-center m-0'>
          <button
            className={`${
              selectedPeriods == 'day'
                ? 'border-b border-red-800 duration-300 '
                : 'border-b hover:border-red-800 duration-300 '
            }`}
            onClick={() => {
              setSelectedPeriods('day');
              handleSearchData('day');
            }}
          >
            Day
          </button>
          <button
            className={`${
              selectedPeriods == 'week'
                ? 'border-b border-red-800 duration-300 '
                : 'border-b hover:border-red-800 duration-300 '
            }`}
            onClick={() => {
              setSelectedPeriods('week');
              handleSearchData('week');
            }}
          >
            Week
          </button>
          <button
            className={`${
              selectedPeriods == 'month'
                ? 'border-b border-red-800 duration-300 '
                : 'border-b hover:border-red-800 duration-300 '
            }`}
            onClick={() => {
              setSelectedPeriods('month');
              handleSearchData('month');
            }}
          >
            Month
          </button>
          <button
            className={`${
              selectedPeriods == 'year'
                ? 'border-b border-red-800 duration-300 '
                : 'border-b hover:border-red-800 duration-300 '
            }`}
            onClick={() => {
              setSelectedPeriods('year');
              handleSearchData('year');
            }}
          >
            Year
          </button>
        </div>

        <div className='flex justify-center items-center w-full px-20 h-auto py-4'>
          <form id='table' className=' p-4 max-w-full '>
            <table className='table-fixed border-collapse w-full'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='w-1/6 px-4 py-2 border'>Index</th>
                  <th className='w-1/6 px-4 py-2 border'>Booking ID</th>
                  <th className='w-1/6 px-4 py-2 border'>Customer Name</th>
                  <th className='w-1/6 px-4 py-2 border'>Customers</th>
                  <th className='w-1/6 px-4 py-2 border'>Total Sale</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className='px-4 py-2 border text-center'>{index + 1}</td>
                      <td className='px-4 py-2 border text-center'>{data?.bookingId}</td>
                      <td className='px-4 py-2 border text-center'>{data?.userData?.name}</td>
                      <td className='px-4 py-2 border text-center'>{data?.totalGuest}</td>
                      <td className='px-4 py-2 border text-center'>{data?.totalPrice}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Sales;
