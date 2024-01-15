'use client';
import { useRTKDispatch, useRTKSelector } from '@/lib/redux';
import RequestNav from './RequestNav';
import { CreateNewRequest } from './RequestNavComponents';
import { fetchRequestsStart } from '@/lib/redux/Request/request.slice';
import { useEffect } from 'react';
import { MoonLoader } from 'react-spinners';

function Navbar() {
  const dispatch = useRTKDispatch();
  const loading = useRTKSelector((state) => state.request.requests.loading);

  useEffect(() => {
    dispatch(fetchRequestsStart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="w-full overflow-hidden absolute z-10 top-7">
      <div className="flex w-full overflow-x-scroll hide-scrollbar">
        <RequestNav />
        <CreateNewRequest />
        <div className="p-2">
          <MoonLoader size={20} loading={loading} color="black" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
