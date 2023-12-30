import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import clsx from 'clsx';
import Navbar from '@/components/Navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Postman Clone',
  description: 'Postman Clone - Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'flex flex-col h-dvh w-dvw')}>
        <header className="flex justify-center py-1 bg-primary">
          <h1 className="text-sm text-white font-semibold">POSTMAN CLONE</h1>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
