import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className=' bg-[#e5b48c] p-1 '>
      <p className='w-full flex justify-center items-center text-sm text-center'>
        <span className='flex gap-2 pr-2'>
          Made with <FaHeart className='mt-1' />
        </span>
        {new Date().getFullYear()} Seven Doors
      </p>
    </div>
  );
};

export default Footer;
