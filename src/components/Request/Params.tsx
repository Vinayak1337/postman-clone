import { useRTKDispatch, useRTKSelector } from '@/lib/redux';
import TableForm from './TableForm';
import { JsonObject } from '@prisma/client/runtime/library';
import { changeParams } from '@/lib/redux/Request/request.slice';

const Params = () => {
  const params =
    (useRTKSelector(
      (state) =>
        state.request.requests[state.request.selectedRequestId]?.params,
    ) as Array<JsonObject>) || [];

  const dispatch = useRTKDispatch();

  const handleKeyChange =
    (paramNum: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newParams = [...params];

      if (newParams[paramNum])
        newParams[paramNum] = { ...newParams[paramNum], key: e.target.value };
      else newParams.push({ key: e.target.value, value: '', enabled: true });

      dispatch(changeParams(newParams));
    };

  const handleValueChange =
    (paramNum: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newParams = [...params];

      if (newParams[paramNum])
        newParams[paramNum] = { ...newParams[paramNum], value: e.target.value };
      else newParams.push({ key: '', value: e.target.value, enabled: true });

      dispatch(changeParams(newParams));
    };

  const handleCheckboxChange =
    (paramNum: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newParams = [...params];

      if (newParams[paramNum])
        newParams[paramNum] = {
          ...newParams[paramNum],
          enabled: e.target.checked,
        };
      else newParams.push({ key: '', value: '', enabled: e.target.checked });

      dispatch(changeParams(newParams));
    };

  const handleDeleteParam = (paramNum: number) => () => {
    const newParams = [...params];
    newParams.splice(paramNum, 1);
    dispatch(changeParams(newParams));
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-400 font-medium">Query Params</p>
      <div className="flex flex-col">
        <TableForm isDummy disabled inputKey="Key" inputValue="Value" />
        {params?.map((param, i) => (
          <TableForm
            key={i + '-param'}
            handleKeyChange={handleKeyChange(i)}
            handleValueChange={handleValueChange(i)}
            handleCheckboxChange={handleCheckboxChange(i)}
            handleDelete={handleDeleteParam(i)}
            inputKey={param.key as string}
            inputValue={param.value as string}
            isChecked={param.enabled as boolean}
          />
        ))}
        <TableForm
          key={params.length + '-param'}
          isDummy
          handleKeyChange={handleKeyChange(params.length)}
          handleValueChange={handleValueChange(params.length)}
          handleCheckboxChange={handleCheckboxChange(params.length)}
          handleDelete={handleDeleteParam(params.length)}
        />
      </div>
    </div>
  );
};

export default Params;
