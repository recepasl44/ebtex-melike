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

  useEffect(() => {
    if (params.enabled === false) return;
    dispatch(fetchInterruptionList(params));
  }, [params, dispatch]);

  const interruptions: Interruption[] = data || [];
  const loading = status === InterruptionListStatus.LOADING;

  return {
    interruptions,
    loading,
    error,
  };
}
