import DepositCalculator from './_components/DepositCalculator';
import Footer from './_components/Footer';

export default function Home() {
  return (
    <div className='flex md:flex-col justify-center items-center w-full h-full md:h-screen md:bg-[#2b664c] relative'>
      <DepositCalculator />
      <Footer />
    </div>
  );
}
