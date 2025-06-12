import{ forwardRef } from 'react';

import Flatpickr from 'react-flatpickr';

interface SpkFlatpickrProps {
  value?: string | Date | Date[] | undefined;
  onfunChange?: (dates: Date[]) => void;
  options?: any;
  inputClass?: string;
  placeholder?: string | any;
  dataEnableTime?: boolean;
  disable?: boolean
}

const SpkFlatpickr = forwardRef<any, SpkFlatpickrProps>(
  (
    {
      value,
      onfunChange,
      inputClass,
      placeholder,
      dataEnableTime = false,
      disable = false,
      options,
    },
    ref,
  ) => {
    return (
      <Flatpickr
        ref={ref as any}
        className={inputClass}
        value={value}
        onChange={onfunChange}
        disabled={disable}
        options={options}
        placeholder={placeholder}
        data-enable-time={dataEnableTime}
      />
    );
  },
);

export default SpkFlatpickr;
