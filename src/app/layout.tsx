import type { Metadata } from "next";
import { Quicksand } from 'next/font/google';
import './globals.css';
import Footer from './_components/Footer';

const quicksand = Quicksand({ subsets: ['latin'], weight: '500' });

export const metadata: Metadata = {
  title: 'Garage Projects',
  description: 'Garage Projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={quicksand.className}>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
