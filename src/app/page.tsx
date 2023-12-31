'use client';
import { useRTKDispatch } from '@/lib/redux';
import { fetchRequestsStart } from '@/lib/redux/Request/request.slice';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useRTKDispatch();

  useEffect(() => {
    dispatch(fetchRequestsStart());
  }, [dispatch]);

  return <></>;
}
