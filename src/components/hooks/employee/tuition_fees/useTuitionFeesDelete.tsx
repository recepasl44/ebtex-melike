// F:\xintra_react_ts\src\components\hooks\employee\tuition_fees\useTuitionFeesDelete.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { deleteTuitionFees } from "../../../../slices/employee/tuition_fees/delete/thunk";
import TuitionFeesListStatus from "../../../../enums/employee/tuition_fees/list";

export function useTuitionFeesDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.tuitionFeesDelete
  );

  const deleteExistingTuitionFees = useCallback(
    async (id: number) => {
      const action = await dispatch(deleteTuitionFees(id));
      if (deleteTuitionFees.fulfilled.match(action)) {
        return action.payload; // number | null
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === TuitionFeesListStatus.LOADING;

  return {
    deletedTuitionFees: data,
    loading,
    error,
    deleteExistingTuitionFees,
  };
}
