
import { useEffect } from "react";

export type DependentConfig = {
  dependencyKey: string;
  defaultValue: (dependencyValue: string) => string;
};

export function useDependentFiltersUpdate(
  filtersState: Record<string, string>,
  updateFilter: (key: string, value: string) => void,
  dependencies: { [dependentKey: string]: DependentConfig }
) {
  useEffect(() => {
    Object.keys(dependencies).forEach((dependentKey) => {
      const { dependencyKey, defaultValue } = dependencies[dependentKey];
      if (filtersState[dependencyKey]) {
        if (!filtersState[dependentKey]) {
          updateFilter(dependentKey, defaultValue(filtersState[dependencyKey]));
        }
      } else {
        if (filtersState[dependentKey]) {
          updateFilter(dependentKey, "");
        }
      }
    });
  }, [filtersState, updateFilter, dependencies]);
}
