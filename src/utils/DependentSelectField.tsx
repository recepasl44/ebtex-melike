import { useEffect, useState } from "react";
import { useFormikContext } from "formik";

export interface Option {
  value: string;
  label: string;
}

interface DependentSelectFieldProps {
  name: string;
  dependencyName: string;
  label?: string;
  required?: boolean;
  fetchOptions: (dependencyValue: string) => Promise<Option[]>;
}

const DependentSelectField: React.FC<DependentSelectFieldProps> = ({
  name,
  dependencyName,
  label,
  required,
  fetchOptions,
}) => {
  const { values, setFieldValue } = useFormikContext<any>();
  const dependencyValue = values[dependencyName];
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (!dependencyValue) {
      setOptions([]);
      setFieldValue(name, "");
      return;
    }
    fetchOptions(dependencyValue).then((result) => {
   
      setOptions(result || []);
    });
  }, [dependencyValue, fetchOptions, name, setFieldValue]);

  return (
    <div className="mb-3">
      {label && (
        <label>
          {label}
          {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <select
        className="form-select"
        name={name}
        value={values[name] || ""}
        onChange={(e) => setFieldValue(name, e.target.value)}
      >
        <option value="">Seçiniz</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DependentSelectField;
