import { useRTKDispatch, useRTKSelector } from '@/lib/redux';
import { changeHeaders } from '@/lib/redux/Request/request.slice';
import { JsonObject } from '@prisma/client/runtime/library';
import TableForm from './TableForm';

const Headers = () => {
  const headers =
    (useRTKSelector(
      (state) =>
        state.request.requests[state.request.selectedRequestId]?.headers,
    ) as Array<JsonObject>) || [];

  const dispatch = useRTKDispatch();

  const handleKeyChange =
    (num: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHeaders = [...headers];

      if (newHeaders[num])
        newHeaders[num] = { ...newHeaders[num], key: e.target.value };
      else newHeaders.push({ key: e.target.value, value: '', enabled: true });

      dispatch(changeHeaders(newHeaders));
    };

  const handleValueChange =
    (num: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHeaders = [...headers];

      if (newHeaders[num])
        newHeaders[num] = {
          ...newHeaders[num],
          value: e.target.value,
        };
      else newHeaders.push({ key: '', value: e.target.value, enabled: true });

      dispatch(changeHeaders(newHeaders));
    };

  const handleCheckboxChange =
    (num: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHeaders = [...headers];

      if (newHeaders[num])
        newHeaders[num] = {
          ...newHeaders[num],
          enabled: e.target.checked,
        };
      else newHeaders.push({ key: '', value: '', enabled: e.target.checked });

      dispatch(changeHeaders(newHeaders));
    };

  const handleDelete = (num: number) => () => {
    const newHeaders = [...headers];
    newHeaders.splice(num, 1);
    dispatch(changeHeaders(newHeaders));
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-400 font-medium">Headers</p>
      <div className="flex flex-col">
        <TableForm isDummy disabled inputKey="Key" inputValue="Value" />
        {headers?.map((header, i) => (
          <TableForm
            key={i + '-header'}
            handleKeyChange={handleKeyChange(i)}
            handleValueChange={handleValueChange(i)}
            handleCheckboxChange={handleCheckboxChange(i)}
            handleDelete={handleDelete(i)}
            inputKey={header.key as string}
            inputValue={header.value as string}
            isChecked={header.enabled as boolean}
          />
        ))}
        <TableForm
          key={headers.length + '-header'}
          isDummy
          handleKeyChange={handleKeyChange(headers.length)}
          handleValueChange={handleValueChange(headers.length)}
        />
      </div>
    </div>
  );
};

export default Headers;
