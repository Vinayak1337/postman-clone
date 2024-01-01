'use client';
import { useRTKDispatch, useRTKSelector } from '@/lib/redux';
import { selectMeta } from '@/lib/redux/Request/request.slice';
import clsx from 'clsx';
import Params from './Params';
import Headers from './Headers';
import Body from './Body';

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
            className={clsx(
              'text-sm capitalize pb-1 cursor-pointer font-medium',
              {
                'border-b-2 border-primary': selectedMeta === option,
              },
            )}
          >
            {option}
          </p>
        ))}
      </div>
      <div className="w-full h-[30dvh] overflow-hidden">
        <div className="w-full h-full overflow-y-scroll hide-scrollbar">
          {RenderMetaView(selectedMeta)}
        </div>
      </div>
    </div>
  );
};

const RenderMetaView = (option: 'params' | 'body' | 'headers') => {
  switch (option) {
    case 'params':
      return <Params />;

    case 'headers':
      return <Headers />;

    default:
      return <Body />;
  }
};

const options = ['params', 'headers', 'body'] as const;

export default RequestMetaNav;
