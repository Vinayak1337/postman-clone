'use client';
import { HttpMethod, Prisma } from '@prisma/client';
import { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import Method, { methods } from '../Method/Method';
import clsx from 'clsx';
import { useRTKDispatch, useRTKSelector } from '@/lib/redux';
import {
  changeMethod,
  changeUrl,
  sendRequestStart,
} from '@/lib/redux/Request/request.slice';
import { toast } from 'react-toastify';

const RequestHeader = () => {
  const request = useRTKSelector(
    (state) => state.request.requests[state.request.selectedRequestId],
  );

  const dispatch = useRTKDispatch();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(changeUrl(e.target.value));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendRequestStart(request as any));
    toast.promise(
      new Promise(() => {}),
      {
        pending: 'Processing...',
      },
      {
        toastId: 'request-' + request.id,
      },
    );
  };

  return (
    <div className="flex items-center gap-2">
      <form className="flex items-center gap-2 w-full" onSubmit={handleSubmit}>
        <div className="border-2 flex flex-grow rounded-lg">
          <Methods />

          <input
            name="url"
            id="url"
            className={clsx('flex-grow caret-primary pl-5 outline-primary')}
            defaultValue={request?.url}
            placeholder="Untitled Request"
            onChange={handleUrlChange}
            required
          />
        </div>
        <input
          className="bg-secondary hover:bg-secondary-hover px-5 py-3 rounded-lg text-white cursor-pointer"
          type="submit"
          value="Send"
        />
      </form>
    </div>
  );
};

const options: {
  value: HttpMethod;
  label: JSX.Element;
}[] = Object.entries(methods).map(([key, value]) => ({
  value: key as HttpMethod,
  label: value,
}));

const Methods = () => {
  const method = useRTKSelector(
    (state) => state.request.requests[state.request.selectedRequestId]?.method,
  );
  const dispatch = useRTKDispatch();
  const [selectedMethod, setSelectedMethod] = useState(
    options.find((option) => option.value === method),
  );

  const handleMethodChange = (newValue: SingleValue<(typeof options)[0]>) => {
    if (!newValue) return;

    setSelectedMethod(newValue);
    dispatch(changeMethod(newValue.value));
  };

  return (
    <Select
      name="method"
      id="method"
      options={options}
      value={selectedMethod}
      defaultValue={selectedMethod}
      onChange={handleMethodChange}
      styles={{
        control: (provided) => ({
          ...provided,
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
        }),
        option: (provided, state) => ({
          ...provided,
          background: state.isSelected ? 'rgba(0,0,0,0.2)' : 'transparent',
          ':hover': {
            background: 'rgba(0,0,0,0.15)',
          },
        }),
      }}
    />
  );
};

export default RequestHeader;
