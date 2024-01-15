'use client';
import { Prisma } from '@prisma/client';
import { useRTKDispatch } from '@/lib/redux';
import { useEffect } from 'react';
import { setRequest } from '@/lib/redux/Request/request.slice';
import RequestMetaNav from './RequestMetaNav';
import RequestHeader from './RequestHeader';

const Request = (props: Prisma.RequestGetPayload<{}>) => {
  const dispatch = useRTKDispatch();

  useEffect(() => {
    dispatch(setRequest(props));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      <RequestHeader />
      <RequestMetaNav />
    </div>
  );
};

export default Request;
