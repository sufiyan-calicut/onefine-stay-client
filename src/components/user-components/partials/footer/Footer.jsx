import React from 'react';

function Footer() {
  return (
    <footer className='h-fit  rounded-t-3xl m- p-10 tracking-wider bg-blue-100 shadow-xl '>
      <div className='container mx-auto text-center mt-10 flex flex-col  gap-3 '>
        <h1 className='text-cyan-900 font-bold tracking-wide text-lg'>Roomie.com</h1>
        <h4 className='font-semibold'>Contact us</h4>
        <h4 className=''>+91 9946257644</h4>
        <h4 className='text-xs md:text-sm'>sufiyanakkode@gmail.com</h4>
        <div
          className='flex w-full justify-center gap-3 mt-4
        '
        >
          <a href='https://instagram.com/su_fi_mhd?igshid=OTk0YzhjMDVlZA=='>
            <img
              src='https://cdn-icons-png.flaticon.com/512/174/174855.png'
              className='w-8 h-8 md:h-10 md:w-10'
              alt='logo'
              
            />
          </a>
          <a href='https://www.linkedin.com/in/sufiyan-em-70b312258/'>
            <img
              src='https://cdn-icons-png.flaticon.com/512/174/174857.png'
              className='w-8 h-8 md:h-10 md:w-10'
              alt='logo'
            />
          </a>
          <a href='https://github.com/sufiyan-calicut'>
            <img
              src='https://cdn-icons-png.flaticon.com/512/25/25231.png'
              className='w-8 h-8 md:h-10 md:w-10'
              alt='logo'
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
