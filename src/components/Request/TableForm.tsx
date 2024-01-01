import { TrashIcon } from '@heroicons/react/16/solid';
import { FC } from 'react';

const TableForm: FC<TableFormProps> = ({
  isDummy,
  disabled,
  handleCheckboxChange,
  handleDelete,
  handleKeyChange,
  handleValueChange,
  isChecked,
  inputKey,
  inputValue,
}) => (
  <div className="flex font-medium w-full">
    <div className="p-1 min-w-10 border flex items-center justify-center">
      {!isDummy && !disabled && (
        <input
          onChange={handleCheckboxChange}
          checked={isChecked}
          type="checkbox"
          defaultChecked
        />
      )}
    </div>
    <div className="p-1 border border-l-0 flex-grow min-w-10">
      <input
        type="text"
        className="h-full outline-none border-none pl-2 text-sm w-full flex-grow"
        placeholder="Key"
        value={inputKey}
        onChange={handleKeyChange}
        disabled={disabled}
      />
    </div>
    <div className="p-1 border border-l-0 flex-grow min-w-10">
      <input
        type="text"
        className="h-full outline-none border-none pl-2 text-sm w-full flex-grow"
        placeholder="Value"
        value={inputValue}
        onChange={handleValueChange}
        disabled={disabled}
      />
    </div>
    <div className="p-1 min-w-10 border flex items-center justify-center border-l-0 hover:bg-gray-300">
      {!isDummy && !disabled && (
        <TrashIcon
          onClick={handleDelete}
          className="w-4 h-4 text-gray-700 cursor-pointer"
        />
      )}
    </div>
  </div>
);

export default TableForm;

interface TableFormProps {
  disabled?: boolean;
  isDummy?: boolean;
  handleKeyChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete?: () => void;
  handleCheckboxChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
  inputKey?: string;
  inputValue?: string;
}
