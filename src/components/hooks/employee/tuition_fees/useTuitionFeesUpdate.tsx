// F:\xintra_react_ts\src\components\hooks\employee\tuition_fees\useTuitionFeesUpdate.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { updateTuitionFees } from "../../../../slices/employee/tuition_fees/update/thunk";
import { TuitionFeesUpdatePayload } from "../../../../types/employee/tuition_fees/update";
import TuitionFeesListStatus from "../../../../enums/employee/tuition_fees/list";

export function useTuitionFeesUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.tuitionFeesUpdate
  );

  const updateExistingTuitionFees = useCallback(
    async (payload: TuitionFeesUpdatePayload) => {
      const action = await dispatch(updateTuitionFees(payload));
      if (updateTuitionFees.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === TuitionFeesListStatus.LOADING;

  return {
    updatedTuitionFees: data,
    loading,
    error,
    updateExistingTuitionFees,
  };
}
