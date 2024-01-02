'use client';
import { useRTKSelector } from '@/lib/redux';
import clsx from 'clsx';
import { useState } from 'react';
import ResponseBody from './ResponseBody';
import ResponseHeaders from './ResponseHeaders';

const Response = () => {
  const response = useRTKSelector(
    (state) => state.request.response[state.request.selectedRequestId],
  );
  const [selectedMeta, selectMeta] = useState<'body' | 'headers'>('body');

  if (!response)
    return (
      <div className="flex-grow flex justify-center items-center border border-gray-600 rounded-lg">
        <p className="text-primary font-medium text-lg">Nothing to see yet!</p>
      </div>
    );

  const { status, statusText } = response;

  return (
    <div className="border border-gray-600 rounded-lg flex flex-col gap-5 p-3 h-full overflow-hidden max-h-full">
      <div className="flex justify-between">
        <div className="flex gap-3 font-medium">
          <button
            onClick={() => selectMeta('body')}
            className={clsx('p-1', {
              'border-b-2 border-primary': selectedMeta === 'body',
            })}
          >
            Body
          </button>
          <button
            onClick={() => selectMeta('headers')}
            className={clsx('p-1', {
              'border-b-2 border-primary': selectedMeta === 'headers',
            })}
          >
            Headers
          </button>
        </div>
        <div
          className={clsx('flex gap-3 font-medium', {
            'text-status-success': status >= 200 && status < 300,
            'text-status-info': status >= 300 && status < 400,
            'text-status-warning': status >= 400 && status < 500,
            'text-status-error': status >= 500,
          })}
        >
          <p>{status}</p>
          <p className="max-w-10 truncate">{statusText}</p>
        </div>
      </div>
      {RenderResponseMetaView(selectedMeta)}
    </div>
  );
};

const RenderResponseMetaView = (value: 'body' | 'headers') => {
  switch (value) {
    case 'headers':
      return <ResponseHeaders />;

    default:
      return <ResponseBody />;
  }
};

export default Response;
