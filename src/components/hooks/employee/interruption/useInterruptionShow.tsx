import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { fetchInterruptionDetail } from "../../../../slices/employee/interruption/show/thunk";
import InterruptionListStatus from "../../../../enums/employee/interruption/list";
import { Interruption } from "../../../../types/employee/interruption/list";

export function useInterruptionShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.interruptionShow
  );

  const getInterruption = useCallback(
    async (interruptionId: number) => {
      const action = await dispatch(fetchInterruptionDetail(interruptionId));
      if (fetchInterruptionDetail.fulfilled.match(action)) {
        return action.payload as Interruption;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === InterruptionListStatus.LOADING;

  return {
    interruption: data,
    loading,
    error,
    getInterruption,
  };
}
