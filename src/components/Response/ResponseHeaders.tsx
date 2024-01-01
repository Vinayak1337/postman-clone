import { useRTKSelector } from '@/lib/redux';
import React from 'react';
import TableForm from '../TableForm/TableForm';

const ResponseHeaders = () => {
  const headers = useRTKSelector(
    (state) => state.request.response[state.request.selectedRequestId]?.headers,
  ) as { [key: string]: string } | null;

  if (!headers) return null;

  return (
    <div className="flex flex-col">
      <TableForm disabled inputKey={'key'} inputValue={'Value'} />
      {Object.keys(headers).map((key, i) => (
        <TableForm
          key={'header-' + i}
          isDummy
          inputKey={key}
          inputValue={headers[key]}
        />
      ))}
    </div>
  );
};

export default ResponseHeaders;
