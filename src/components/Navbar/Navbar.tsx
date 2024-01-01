'use client';
import { useRTKDispatch } from '@/lib/redux';
import RequestNav from './RequestNav';
import { CreateNewRequest } from './RequestNavComponents';
import { fetchRequestsStart } from '@/lib/redux/Request/request.slice';
import { useEffect } from 'react';

function Navbar() {
  const dispatch = useRTKDispatch();

  useEffect(() => {
    dispatch(fetchRequestsStart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="w-full overflow-hidden absolute z-10 top-7">
      <div className="flex w-full overflow-x-scroll hide-scrollbar">
        <RequestNav />
        <CreateNewRequest />
      </div>
    </nav>
  );
}

export default Navbar;
