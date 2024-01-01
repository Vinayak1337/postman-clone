import Request from '@/components/Request/Request';
import Response from '@/components/Response/Response';
import { fetchRequest } from '@/lib/request.actions';
import { notFound } from 'next/navigation';

const RequestPage = async ({
  params: { request: requestId },
}: {
  params: { request: string };
}) => {
  if (requestId === 'favicon.ico') return notFound();

  const request = await fetchRequest(requestId);

  if (!request) return notFound();

  return (
    <div className="flex flex-col p-3">
      <Request {...request} />
      <Response />
    </div>
  );
};

export default RequestPage;
