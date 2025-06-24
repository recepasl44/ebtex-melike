// F:\xintra_react_ts\src\components\hooks\employee\interruption\useInterruptionList.tsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { fetchInterruptionList } from "../../../../slices/employee/interruption/list/thunk";
import InterruptionListStatus from "../../../../enums/employee/interruption/list";
import { Interruption } from "../../../../types/employee/interruption/list";

interface UseInterruptionListArgs {
  enabled?: boolean;
  [key: string]: any;
}

export function useInterruptionList(params: UseInterruptionListArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.interruptionList
  );


  const { enabled = true, ...filters } = params;

  const filtersKey = JSON.stringify(filters);

  useEffect(() => {
    if (!enabled) return;
    dispatch(fetchInterruptionList(filters));
  }, [dispatch, enabled, filtersKey]);

  const interruptions: Interruption[] = data || [];
  const loading = status === InterruptionListStatus.LOADING;

  return {
    interruptions,
    loading,
    error,
  };
}
