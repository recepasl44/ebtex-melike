import React from 'react';
import Select from "react-dropdown-select";

interface SpkMultiselectProps {
    options: any;
    placeholder?: string;
    mainClass?: string;
    multi?: boolean;
    labelField?: string;
    valueField?: string;
    values?: any[];
    clearable?: boolean;
    searchable?: boolean;
    disabledLabel?: string | any;
    loading?: boolean;
    onChange: (values: any[]) => void;
    noDataLabel?: string;
    dropdownHeight?: string | number;
}

const SpkMultiselect: React.FC<SpkMultiselectProps> = ({
    options,
    mainClass,
    placeholder,
    multi = true,
    labelField,
    valueField,
    values = [],
    clearable = true,
    searchable = true,
    disabledLabel,
    loading = false,
    onChange,
    noDataLabel,
    dropdownHeight = '300px',
}) => {
    const height = dropdownHeight !== undefined ? String(dropdownHeight) : undefined;
    return (
        <Select
            className={mainClass}
            placeholder={placeholder}
            multi={multi}
            labelField={labelField}
            valueField={valueField}
            options={options}
            values={values}
            clearable={clearable}
            searchable={searchable}
            disabledLabel={disabledLabel}
            loading={loading}
            onChange={onChange}
            noDataLabel={noDataLabel}
            dropdownHeight={height}
        />
    );
};

export default SpkMultiselect;
