import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import clsx from 'clsx';
import Navbar from '@/components/Navbar/Navbar';
import Providers from '@/lib/provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <Providers>
      <html lang="en" className="bg-white">
        <body
          className={clsx(
            inter.className,
            'flex flex-col max-h-dvh h-dvh w-dvw overflow-hidden pb-10',
          )}
        >
          <header className="flex justify-center py-1 border-solid border-b">
            <h1 className="text-sm text-primary font-semibold">
              POSTMAN CLONE
            </h1>
          </header>
          <Navbar />
          <ToastContainer position="top-right" />
          {children}
        </body>
      </html>
    </Providers>
  );
}
