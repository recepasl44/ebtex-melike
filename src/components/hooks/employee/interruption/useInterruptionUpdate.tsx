import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { updateInterruption } from "../../../../slices/employee/interruption/update/thunk";
import InterruptionListStatus from "../../../../enums/employee/interruption/list";
import {
  InterruptionUpdatePayload,
  InterruptionUpdateState,
} from "../../../../types/employee/interruption/update";

export function useInterruptionUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.interruptionUpdate
  ) as InterruptionUpdateState;

  const updateExistingInterruption = useCallback(
    async (payload: InterruptionUpdatePayload) => {
      const action = await dispatch(updateInterruption(payload));
      if (updateInterruption.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === InterruptionListStatus.LOADING;

  return {
    updatedInterruption: data,
    loading,
    error,
    updateExistingInterruption,
  };
}
