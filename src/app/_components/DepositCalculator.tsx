'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BorderBeam } from '@/components/magicui/border-beam';
import { useState } from 'react';

const FormSchema = z.object({
  amount: z.number().gte(100, { message: 'Amount must be minimun 100' }),
  rateOfInterest: z
    .number()
    .gte(0)
    .refine(
      (value) => {
        const decimalPart = value.toString().split('.')[1];
        return !decimalPart || decimalPart.length <= 2;
      },
      {
        message: 'Must be a number with up to two decimal places',
      },
    ),
  rateOfInflation: z
    .number()
    .gte(0)
    .refine(
      (value) => {
        const decimalPart = value.toString().split('.')[1];
        return !decimalPart || decimalPart.length <= 2;
      },
      {
        message: 'Must be a number with up to two decimal places',
      },
    ),
  timePeriod: z.number().min(1),
});

const DepositCalculator = () => {
  const [amount, setAmount] = useState('0');
  const [interestRate, setInterestRate] = useState(0);
  const [inflationRate, setInflationRate] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [returns, setReturns] = useState('0');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    // defaultValues: {
    //   amount: 100,
    //   rateOfInterest: 3,
    //   rateOfInflation: 3.5,
    //   timePeriod: 1,
    // },
  });

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  };

  const calculate = (
    principal: number,
    interestRate: number,
    inflationRate: number,
    tenure: number,
  ) => {
    // Calculate Future Value (FV)
    const futureValue = Number(
      (principal * Math.pow(1 + interestRate / 100, tenure)).toFixed(2),
    );

    // Adjust for Inflation
    const realReturn = Number(
      (futureValue / Math.pow(1 + inflationRate / 100, tenure)).toFixed(2),
    );

    setAmount(formatValue(principal));
    setInterestRate(interestRate);
    setInflationRate(inflationRate);
    setTenure(tenure);
    setReturns(formatValue(inflationRate > 0 ? realReturn : futureValue));
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    calculate(
      data.amount,
      data.rateOfInterest,
      data.rateOfInflation,
      data.timePeriod,
    );
  }

  return (
    <div className='flex justify-center items-center w-full h-screen bg-[#2b664c]'>
      <div className='relative flex h-fit w-fit flex-col items-center justify-center overflow-hidden rounded-lg border border-transparent shadow-xl'>
        <div className='w-full h-full p-2 bg-[#6f706f] text-slate-200 text-center'>
          Fixed Deposit Calculator
        </div>
        <div className='grid grid-cols-2 bg-[#3b654e]'>
          <div className='col-span-1 flex justify-center items-center p-5 text-white'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-2/3 space-y-6'>
                <FormField
                  control={form.control}
                  name='amount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          className='text-right [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                          //   placeholder='shadcn'
                          type='number'
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>
                      {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='rateOfInterest'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate of Interest</FormLabel>
                      <FormControl>
                        <Input
                          className='text-right [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                          //   placeholder='shadcn'
                          type='number'
                          step='0.01'
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='rateOfInflation'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate of Inflation</FormLabel>
                      <FormControl>
                        <Input
                          className='text-right [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                          //   placeholder='shadcn'
                          type='number'
                          step='0.01'
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='timePeriod'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Period (in Years)</FormLabel>
                      <FormControl>
                        <Input
                          className='text-right [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                          //   placeholder='shadcn'
                          type='number'
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className='bg-[#25412e]'
                  type='submit'>
                  Calculate
                </Button>
              </form>
            </Form>
          </div>

          <div className='col-span-1 flex justify-center items-center w-full h-full p-10 bg-[#4c745e] text-white'>
            <div className='grid grid-cols-2 relative'>
              <div className='col-span-1'>
                <ul className='space-y-2'>
                  <li>Amount</li>
                  <li>Interest Rate</li>
                  <li>Inflation Rate</li>
                  <li>Duration</li>
                  <li>Maturity Amount</li>
                </ul>
              </div>
              <div className='col-span-1 text-right'>
                <ul className='space-y-2'>
                  <li>{amount}</li>
                  <li>{interestRate}</li>
                  <li>{inflationRate}</li>
                  <li>
                    {tenure}{' '}
                    {tenure === 0 ? '' : tenure === 1 ? 'year' : 'years'}
                  </li>
                  <li>{returns}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <BorderBeam
          size={250}
          duration={25}
          delay={15}
        />
      </div>
    </div>
  );
};

export default DepositCalculator;
