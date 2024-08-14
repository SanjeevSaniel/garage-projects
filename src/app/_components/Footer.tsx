import React from 'react';

const Footer = () => {
  return (
    <div className='w-full flex justify-around bg-[#e5b48c] p-1 text-sm text-center absolute bottom-0'>
      <p>© {new Date().getFullYear()} Seven Doors</p>
      {/* <p>7 Doors Garage Projects</p> */}
    </div>
  );
};

export default Footer;
