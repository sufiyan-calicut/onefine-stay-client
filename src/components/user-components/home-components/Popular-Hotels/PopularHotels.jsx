import React, { useEffect, useState } from 'react';
import { userApi } from '../../../../api/userApi';
import { useNavigate } from 'react-router-dom';

function PopularHotels() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState();

  const handleShowMore = () => {
    const nextVisibleProducts = products.slice(0, visibleProducts.length + 4);
    setVisibleProducts(nextVisibleProducts);
  };
  const getData = async () => {
    await userApi.get('/get-hotel-data').then((response) => {
      const data = response.data;
      setProducts(data.slice(0, 16));
    });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setVisibleProducts(products.slice(0, 8));
  }, []);

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl  tracking-tight text-blue-900 font-extralight cursor-default '>Our popular rooms</h2>

        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8  '>
          {visibleProducts?.map((product) => (
            <div key={product?._id} className='group relative hover:shadow-lg rounded-md'>
              <div className='min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 '>
                <img
                  loading='lazy'
                  src={product.images}
                  alt={product?.imageAlt}
                  className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                />
              </div>
              <div className='mt-4 flex justify-between p-2.5 '>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <a onClick={() => navigate('/single-room-details')}>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {product?.roomName} <span> / </span> {product?.category}
                    </a>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>{product?.numberofBeds}beds</p>
                </div>
                <p className='text-sm font-medium text-gray-900'>{product?.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {visibleProducts?.length != products?.length && (
        <div
          className='flex item-center justify-center mx-auto w-60  bg-white border border-sky-600 rounded-lg py-2 px-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50'
          onClick={handleShowMore}
        >
          Show More
        </div>
      )}
    </div>
  );
}

export default PopularHotels;
