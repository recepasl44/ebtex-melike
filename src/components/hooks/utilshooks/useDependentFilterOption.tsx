import { useState,useCallback } from "react";
import isEqual from "lodash/isEqual";
import { FilterDefinition } from "../../common/ReusableTable"; 
export type FiltersState = Record<string, string>;
export function useFilters(initialFilters: FilterDefinition[]): {
  filters: FilterDefinition[];
  filtersState: FiltersState;
  updateFilter: (key: string, value: string) => void;
  setFilters: (newFilters: FiltersState) => void;
} {
  const [filtersState, setFiltersState] = useState<FiltersState>(() => {
    const state: FiltersState = {};
    initialFilters.forEach((filter) => {
      if (filter.key) {
        state[filter.key] = filter.value ?? '';
      }
    });
    return state;
  });

  const updateFilter = useCallback((key: string, value: string) => {
    setFiltersState((prev) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
  }, []);

  const setFilters = useCallback((newFilters: FiltersState) => {
    setFiltersState((prev) => (isEqual(prev, newFilters) ? prev : newFilters));
  }, []);

  const filters = initialFilters.map((filter) => ({
    ...filter,
    value: filter.key ? filtersState[filter.key] || "" : "",
    onChange: (value: string) => filter.key && updateFilter(filter.key, value),
  }));

  return { filters, filtersState, updateFilter, setFilters };
}
