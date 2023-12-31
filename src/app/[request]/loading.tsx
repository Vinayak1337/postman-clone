import React from 'react';
import { PulseLoader } from 'react-spinners';

const Loading = () => (
  <div className="w-full flex justify-center relative top-5">
    <PulseLoader size={16} />
  </div>
);

export default Loading;
