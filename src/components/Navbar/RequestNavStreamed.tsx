'use client';
import React, { Suspense } from 'react';
import { MoonLoader } from 'react-spinners';
import RequestNav from './RequestNav';

const RequestNavStreamed = () => (
  <Suspense fallback={<MoonLoader size={24} />}>
    <RequestNav />
  </Suspense>
);

export default RequestNavStreamed;
