'use client';
import { useRTKDispatch, useRTKSelector } from '@/lib/redux';
import { selectMeta } from '@/lib/redux/Request/request.slice';
import clsx from 'clsx';

const RequestMetaNav = () => {
  const selectedMeta = useRTKSelector((state) => state.request.selectedMeta);

  const dispatch = useRTKDispatch();

  const selectMetaOption = (option: (typeof options)[number]) =>
    dispatch(selectMeta(option));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 py-2">
        {options.map((option, i) => (
          <p
            key={option + i}
            onClick={() => selectMetaOption(option)}
            className={clsx('text-sm capitalize pb-1 cursor-pointer', {
              'border-b-2 border-primary': selectedMeta === option,
            })}
          >
            {option}
          </p>
        ))}
      </div>
    </div>
  );
};

const options = ['params', 'headers', 'body'] as const;

export default RequestMetaNav;
