'use client';
import { Prisma } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import Method from '../Method/Method';
import { PlusIcon, XCircleIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import { useRTKDispatch } from '@/lib/redux';
import {
  createRequestSuccess,
  deleteRequest,
  selectRequest,
} from '@/lib/redux/Request/request.slice';
import { createRequest } from '@/lib/request.actions';

export const RequestTab = ({
  request: { id, method, url },
  currentRequestId,
}: {
  request: Prisma.RequestGetPayload<{
    select: { id: true; method: true; url: true };
  }>;
  currentRequestId: string;
}) => {
  const isActive = id === currentRequestId;
  const [hovering, setHover] = useState(false);
  const dispatch = useRTKDispatch();

  const handleDelete = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(deleteRequest(id));
  };

  return (
    <Link
      onMouseEnter={setHover.bind(null, true)}
      onMouseLeave={setHover.bind(null, false)}
      onClick={dispatch.bind(null, selectRequest(id))}
      className={clsx(
        'relative gap-1 items-center z-0 flex px-1 py-2 w-1/12 min-w-20 text-xs leading-3 font-normal h-[2.6rem]',
        {
          'border-t-2 border-t-primary border-solid border-x bg-white z-20':
            isActive,
          'vertical-line': !isActive,
        },
      )}
      href={`/${id}`}
    >
      <div className="font-medium">
        {methods[method as keyof typeof methods]}
      </div>
      <p className="truncate">{url || 'Untitled Request'}</p>
      {hovering && (
        <XCircleIcon
          onClick={handleDelete}
          className="absolute top-1 right-1 h-4 w-4"
        />
      )}
    </Link>
  );
};

const methods = {
  GET: <Method.GET />,
  POST: <Method.POST />,
  PUT: <Method.PUT />,
  DELETE: <Method.DELETE />,
};

export const CreateNewRequest = () => {
  const router = useRouter();
  const dispatch = useRTKDispatch();

  const createRequestAndRoute = async () => {
    const request = await createRequest({ method: 'GET', url: '' });
    if (!request) return;

    dispatch(createRequestSuccess(request));
    router.push(`/${request.id}`);
  };

  return (
    <div
      className="relative p-2 cursor-pointer"
      onClick={createRequestAndRoute}
    >
      <PlusIcon className="w-6 h-6 text-primary" />
    </div>
  );
};
