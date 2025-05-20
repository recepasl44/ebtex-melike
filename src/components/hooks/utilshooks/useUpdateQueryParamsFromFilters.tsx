
import { useEffect, useRef } from "react";
import isEqual from "lodash/isEqual";

export function useUpdateQueryParamsFromFilters<T extends object>(
  filtersState: T,
  setQueryParams: (params: T) => void
) {
  const prevFiltersRef = useRef<T>(filtersState);
  useEffect(() => {
    if (!isEqual(prevFiltersRef.current, filtersState)) {
      setQueryParams(filtersState);
      prevFiltersRef.current = filtersState;
    }
  }, [filtersState, setQueryParams]);
}
