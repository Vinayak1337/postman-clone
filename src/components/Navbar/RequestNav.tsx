'use client';
import { useEffect } from 'react';
import { RequestTab } from './RequestNavComponents';
import { useRTKSelector } from '@/lib/redux';
import { useParams, useRouter } from 'next/navigation';

const RequestNav = () => {
  const requests = useRTKSelector((state) => state.request.requests);
  const selectedRequest = useRTKSelector(
    (state) => state.request.selectedRequestId,
  );
  const params = useParams();
  const router = useRouter();

  const { request: requestId } = params;

  useEffect(() => {
    if (!requests[requestId as string] && requests[selectedRequest])
      router.push(`/${selectedRequest}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requests, selectedRequest, requestId]);

  return Object.values(requests).map((request) => (
    <RequestTab
      key={request.id}
      request={request}
      currentRequestId={selectedRequest}
    />
  ));
};

export default RequestNav;
