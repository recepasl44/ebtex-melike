// F:\xintra_react_ts\src\components\hooks\employee\tuition_fees\useTuitionFeesShow.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchTuitionFeesDetail } from "../../../../slices/employee/tuition_fees/detail/thunk";
import TuitionFeesListStatus from "../../../../enums/employee/tuition_fees/list";
import { TuitionFees } from "../../../../types/employee/tuition_fees/list";

export function useTuitionFeesShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.tuitionFeesShow
  );

  const getTuitionFees = useCallback(
    async (id: number) => {
      const action = await dispatch(fetchTuitionFeesDetail(id));
      if (fetchTuitionFeesDetail.fulfilled.match(action)) {
        return action.payload as TuitionFees;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === TuitionFeesListStatus.LOADING;

  return {
    tuitionFees: data,
    loading,
    error,
    getTuitionFees,
  };
}
