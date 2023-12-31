'use client';
import { HttpMethod } from '@prisma/client';
import { useState } from 'react';
import Select from 'react-select';
import Method from '../Method/Method';
import clsx from 'clsx';
import { useRTKDispatch, useRTKSelector } from '@/lib/redux';
import { changeMethod, changeUrl } from '@/lib/redux/Request/request.slice';

const RequestHeader = () => {
  const url = useRTKSelector(
    (state) => state.request.requests[state.request.selectedRequestId]?.url,
  );
  const dispatch = useRTKDispatch();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(changeUrl(e.target.value));

  return (
    <div className="flex items-center gap-2">
      <div className="border-2 flex flex-grow rounded-lg">
        <Methods />
        <input
          name="url"
          id="url"
          className={clsx('flex-grow caret-primary pl-5 outline-primary')}
          defaultValue={url}
          placeholder="Untitled Request"
          onChange={handleUrlChange}
        />
      </div>
      <input
        className="bg-secondary hover:bg-secondary-hover px-5 py-3 rounded-lg text-white"
        type="submit"
        value="Send"
      />
    </div>
  );
};

const options: {
  value: HttpMethod;
  label: JSX.Element;
}[] = [
  { value: 'GET', label: <Method.GET /> },
  { value: 'POST', label: <Method.POST /> },
  { value: 'PUT', label: <Method.PUT /> },
  { value: 'DELETE', label: <Method.DELETE /> },
];

const Methods = () => {
  const method = useRTKSelector(
    (state) => state.request.requests[state.request.selectedRequestId]?.method,
  );
  const dispatch = useRTKDispatch();
  const [selectedMethod, setSelectedMethod] = useState(
    options.find((option) => option.value === method),
  );

  const handleMethodChange = (newValue: {
    value: HttpMethod;
    label: JSX.Element;
  }) => {
    setSelectedMethod(newValue);
    dispatch(changeMethod(newValue.value));
  };

  return (
    <Select
      name="method"
      id="method"
      options={options as any}
      value={selectedMethod}
      defaultValue={selectedMethod}
      onChange={handleMethodChange as any}
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
