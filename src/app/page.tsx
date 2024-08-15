import Image from 'next/image';
import DepositCalculator from './_components/DepositCalculator';

export default function Home() {
  return (
    <div className='flex md:flex-col justify-center items-center max-w-[1440px] m-auto h-screen relative'>
      <DepositCalculator />

      <div className='absolute -left-10 top-0 right-0 bottom-0 overflow-clip'>
        <Image
          src={'/11299317_4706201.jpg'}
          alt='Financial Illustrations'
          width={1460}
          height={500}
          className='absolute left-8'
        />
      </div>
    </div>
  );
}
