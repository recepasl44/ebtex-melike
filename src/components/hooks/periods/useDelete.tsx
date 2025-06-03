import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deletePeriod } from "../../../slices/periods/delete/thunk";

export function usePeriodDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.periodsDelete
  );

  const deleteExistingPeriod = useCallback(
    async (periodId: number) => {
      const resultAction = await dispatch(deletePeriod(periodId));
      if (deletePeriod.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedPeriod: data, status, error, deleteExistingPeriod };
}
