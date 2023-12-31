import Request from '@/components/Request/Request';
import { fetchRequest } from '@/lib/request.actions';
import { notFound } from 'next/navigation';

const RequestPage = async ({
  params: { request: requestId },
}: {
  params: { request: string };
}) => {
  const request = await fetchRequest(requestId);

  if (!request) return notFound();

  return (
    <div className="flex flex-col p-3">
      <Request {...request} />
    </div>
  );
};

export default RequestPage;
