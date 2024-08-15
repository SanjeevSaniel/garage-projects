This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# Deposit Returns Calculator

## Description

This project calculates the real value of an investment after accounting for compound interest and inflation. It uses JavaScript to perform the calculations.

- NPM Package: <https://www.npmjs.com/package/deposit-calculator?activeTab=readme>

## Installation

1. Clone the repository:

   ```sh
    git clone https://github.com/SanjeevSaniel/garage-projects

2. Navigate to the project directory:
    cd deposit-returns-calculator

3. Install dependencies (if any):
    npm install

### To calculate the real value of an investment, use the calculateRealValue

```sh
    function calculateRealValue(
        principal, 
        annualInterestRate, 
        compoundingFrequency, 
        years, 
        inflationRate
    ) {
        // Calculate the future value with compound interest
        const futureValue = principal * Math.pow(
            (1 + annualInterestRate / compoundingFrequency), compoundingFrequency * years);

        // Adjust for inflation
        const realValue = futureValue / Math.pow((1 + inflationRate), years);

        return realValue;
    }


    // Example usage:

    const principal = 10000; // Initial deposit
    const annualInterestRate = 0.05; // 5% annual interest rate
    const compoundingFrequency = 4; // Quarterly compounding
    const years = 10; // Investment period in years
    const inflationRate = 0.02; // 2% annual inflation rate

    const realValue = calculateRealValue(principal, annualInterestRate, compoundingFrequency, years, inflationRate);
    console.log(`The real value of the investment after ${years} years is: $${realValue.toFixed(2)}`);
