import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updatePeriod } from "../../../slices/periods/update/thunk";
import { PeriodsUpdatePayload } from "../../../types/periods/update";

export function usePeriodUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.periodsUpdate
  );

  const updateExistingPeriod = useCallback(
    async (payload: PeriodsUpdatePayload) => {
      const resultAction = await dispatch(updatePeriod(payload));
      if (updatePeriod.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedPeriod: data, status, error, updateExistingPeriod };
}
