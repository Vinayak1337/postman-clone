'use client'
import React from 'react';
import { BarLoader } from 'react-spinners';

const Loading = () => (
  <div className="w-full flex justify-center relative top-5">
    <BarLoader loading />
  </div>
);

export default Loading;
