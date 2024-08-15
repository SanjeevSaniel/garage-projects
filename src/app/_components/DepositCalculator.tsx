'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FormSchema = z.object({
  amount: z.number().gte(100, { message: 'Amount must be minimun 100' }),
  rateOfInterest: z
    .number()
    .gt(0)
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
  compounding: z
    .string({
      required_error: 'Please select compounding frequency',
    })
    
});

const CalculationResults = ({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) => {
  return (
    <div className='grid grid-cols-2 items-center relative w-full my-2 px-3 py-1'>
      <div className='col-span-1 text-left'>{label}</div>
      <div className='col-span-1 text-right text-[#e2e6c3]'>{value}</div>
    </div>
  );
};

const ResultsSection = ({
  amount,
  interestRate,
  inflationRate,
  tenure,
  maturityAmount,
  returns,
  differenceValue,
  actualReturn,
  adjustedReturn,
}: {
  amount: string;
  interestRate: number;
  inflationRate: number;
  tenure: number;
  maturityAmount: string;
  returns: string;
  differenceValue: string;
  actualReturn: string;
  adjustedReturn: string;
}) => {
  return (
    <div>
      <CalculationResults
        label='Present Value'
        value={amount}
      />
      <CalculationResults
        label='Interest Rate (%)'
        value={interestRate}
      />
      <CalculationResults
        label='Inflation Rate (%)'
        value={inflationRate}
      />

      <CalculationResults
        label='Duration'
        value={tenure === 0 ? 0 : tenure === 1 ? `${tenure}Y` : `${tenure}Yrs`}
      />

      <div className='w-full bg-[#70772d] rounded-lg relative '>
        <CalculationResults
          label='Maturity Value'
          value={maturityAmount}
        />
      </div>

      <div className='w-full bg-[#886332] rounded-lg relative '>
        <CalculationResults
          label='Inflation adjusted Value'
          value={returns}
        />
      </div>

      <div className='w-full bg-[#973f38] rounded-lg relative '>
        <CalculationResults
          label='Difference'
          value={differenceValue}
        />
      </div>

      <div className='w-full bg-[#565a4f] rounded-lg relative pb-1'>
        <p className='text-center text-gray-300 p-2'>Returns</p>
        <CalculationResults
          label='Maturity returns'
          value={actualReturn}
        />
        <CalculationResults
          label='Adjusted returns'
          value={adjustedReturn}
        />
      </div>

      <div className='mt-4'>
        <Alert
          variant='default'
          className='bg-transparent border border-gray-400 text-gray-300'>
          {/* <Terminal className='h-4 w-4' /> */}
          {/* <AlertTitle>Heads up!</AlertTitle> */}
          <AlertDescription>
            <p>
              <span className='text-white'>Maturity Value </span>
              is the value without considering inflation.
            </p>
            <p>
              <span className='text-white'>Inflation adjusted Value </span>
              reflects its equivalent worth in today’s value.
            </p>
            <p>
              <span className='text-white'>Difference</span> is the added costs
              needed, caused due to inflation.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

const frequency = [
  {
    id: 1,
    value: 'monthly',
  },
  {
    id: 2,
    value: 'quarterly',
  },
  {
    id: 3,
    value: 'half yearly',
  },
  {
    id: 4,
    value: 'yearly',
  },
];

const DepositCalculator = () => {
  const [amount, setAmount] = useState('0');
  const [interestRate, setInterestRate] = useState(0);
  const [inflationRate, setInflationRate] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [maturityAmount, setMaturityAmount] = useState('0');
  const [returns, setReturns] = useState('0');
  const [differenceValue, setDifferenceValue] = useState('0');
  const [actualReturn, setActualReturn] = useState('0');
  const [adjustedReturn, setAdjustedReturn] = useState('0');

  let freq = 0;
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
    compoundingFrequency: string,
  ) => {
    switch (compoundingFrequency) {
      case 'monthly':
        freq = 12;
        break;

      case 'quarterly':
        freq = 3;
        break;

      case 'half yearly':
        freq = 2;
        break;

      default:
        freq = 1;
        break;
    }

    // Calculate Future Value (FV)
    const futureValue = Number(
      (
        principal * Math.pow(1 + interestRate / 100 / freq, freq * tenure)
      ).toFixed(2),
    );

    // Adjust for Inflation
    const realReturn = Number(
      (futureValue / Math.pow(1 + inflationRate / 100, tenure)).toFixed(2),
    );

    setAmount(formatValue(principal));
    setInterestRate(interestRate);
    setInflationRate(inflationRate);
    setTenure(tenure);
    setMaturityAmount(formatValue(futureValue));
    setReturns(formatValue(inflationRate > 0 ? realReturn : 0));
    setDifferenceValue(formatValue(realReturn - futureValue));
    setActualReturn(formatValue(futureValue - principal));
    setAdjustedReturn(
      formatValue(inflationRate > 0 ? realReturn - principal : 0),
    );

    freq = 0;
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    calculate(
      data.amount,
      data.rateOfInterest,
      data.rateOfInflation,
      data.timePeriod,
      data.compounding,
    );
  }

  return (
    <div className='relative flex md:max-w-[70%] h-full flex-col items-center justify-center md:overflow-hidden rounded-lg border border-transparent z-20'>
      <div className='w-full py-10 md:p-4 md:text-slate-700 text-3xl font-semibold text-center'>
        Returns Calculator
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 bg-[#3b654e]'>
        <div className='col-span-1 flex justify-center items-center py-10 text-white'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-2/3 space-y-6'>
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-100'>Amount (₹)</FormLabel>
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
                    <FormLabel className='text-gray-100'>
                      Rate of Interest (%)
                    </FormLabel>
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
                    <FormLabel className='text-gray-100'>
                      Rate of Inflation (%)
                    </FormLabel>
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
                    <FormLabel className='text-gray-100'>
                      Time Period (in Years)
                    </FormLabel>
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

              <FormField
                control={form.control}
                name='compounding'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compounding Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select frequency' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {frequency.map((f) => (
                          <SelectItem
                            key={f.id}
                            value={f.value}
                            className='capitalize'>
                            {f.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

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

        <div className='col-span-1 flex flex-col gap-2 justify-center items-center w-full h-full p-5 bg-[#4c745e] text-gray-100 '>
          <ResultsSection
            amount={amount}
            interestRate={interestRate}
            inflationRate={inflationRate}
            tenure={tenure}
            maturityAmount={maturityAmount}
            returns={returns}
            differenceValue={differenceValue}
            actualReturn={actualReturn}
            adjustedReturn={adjustedReturn}
          />
        </div>
      </div>
      <BorderBeam
        size={250}
        duration={25}
        delay={15}
        className='hidden md:visible'
      />
    </div>
  );
};

export default DepositCalculator;
