import DepositCalculator from './_components/DepositCalculator';

export default function Home() {
  return (
    <div className='flex md:flex-col justify-center items-center w-full h-screen md:h-screen md:bg-[#2b664c] relative'>
      <DepositCalculator />
    </div>
  );
}
