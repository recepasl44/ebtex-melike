import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { addInterruption } from "../../../../slices/employee/interruption/add/thunk";
import InterruptionListStatus from "../../../../enums/employee/interruption/list";
import {
  InterruptionAddPayload,
  InterruptionAddState,
} from "../../../../types/employee/interruption/add";

export function useInterruptionAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.interruptionAdd
  ) as InterruptionAddState;

  const addNewInterruption = useCallback(
    async (payload: InterruptionAddPayload) => {
      const action = await dispatch(addInterruption(payload));
      if (addInterruption.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === InterruptionListStatus.LOADING;

  return {
    addedInterruption: data,
    loading,
    error,
    addNewInterruption,
  };
}
