import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { deleteInterruption } from "../../../../slices/employee/interruption/delete/thunk";
import InterruptionListStatus from "../../../../enums/employee/interruption/list";
import { InterruptionDeleteStatate } from "../../../../types/employee/interruption/delete";

export function useInterruptionDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.interruptionDelete
  ) as InterruptionDeleteStatate;

  const deleteExistingInterruption = useCallback(
    async (interruptionId: number) => {
      const action = await dispatch(deleteInterruption(interruptionId));
      if (deleteInterruption.fulfilled.match(action)) {
        return action.payload; // number | null
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === InterruptionListStatus.LOADING;

  return {
    deletedInterruption: data,
    loading,
    error,
    deleteExistingInterruption,
  };
}
