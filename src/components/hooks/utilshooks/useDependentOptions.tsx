
import { useState, useEffect } from "react";

export interface Option {
  value: string;
  label: string;
}

export function useDependentOptions(
  dependencyValue: string,
  fetchOptions: (dependencyValue: string) => Promise<Option[]>,
  defaultOptions: Option[] = []
) {
  const [options, setOptions] = useState<Option[]>(defaultOptions);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if (!dependencyValue) {
      setOptions(defaultOptions);
      return;
    }

    setLoading(true);
    fetchOptions(dependencyValue)
      .then((opts) => {
        setOptions(opts);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Seçenekler alınamadı");
        setOptions(defaultOptions);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dependencyValue, fetchOptions, defaultOptions]);

  return { options, loading, error };
}
