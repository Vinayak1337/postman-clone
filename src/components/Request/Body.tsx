'use client';
import { useRTKDispatch, useRTKSelector } from '@/lib/redux';
import { changeBody } from '@/lib/redux/Request/request.slice';
import { JsonValue } from '@prisma/client/runtime/library';
import { InteractionProps } from 'react-json-view';
import { Suspense } from 'react';

const Body = () => {
  const body = useRTKSelector(
    (state) => state.request.requests[state.request.selectedRequestId]?.body,
  );
  const dispatch = useRTKDispatch();

  const handleStart = (value: JsonValue) => () => dispatch(changeBody(value));

  if (!body)
    return (
      <div className="flex gap-3 items-center font-semibold">
        <p>Start with:</p>
        <button
          onClick={handleStart([])}
          className="text-white font-medium text-sm px-4 py-3 bg-secondary rounded-lg"
        >
          Array {'[ ]'}
        </button>
        <p>OR</p>
        <button
          onClick={handleStart({})}
          className="text-white font-medium text-sm px-4 py-3 bg-secondary rounded-lg"
        >
          Object {'{ }'}
        </button>
      </div>
    );

  const handleChange = (e: InteractionProps) =>
    dispatch(changeBody(e.updated_src));

  return (
    <div className="w-full h-full flex">
      <Suspense fallback={null}>
        {import('react-json-view').then(({ default: ReactJson }) => (
          <ReactJson
            enableClipboard
            onEdit={handleChange}
            src={body as object}
            onAdd={handleChange}
            onDelete={handleChange}
          />
        ))}
      </Suspense>
    </div>
  );
};

export default Body;
