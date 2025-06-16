// F:\xintra_react_ts\src\components\hooks\employee\tuition_fees\useTuitionFeesList.tsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchTuitionFeesList } from "../../../../slices/employee/tuition_fees/list/thunk";
import TuitionFeesListStatus from "../../../../enums/employee/tuition_fees/list";
import { TuitionFees } from "../../../../types/employee/tuition_fees/list";

export function useTuitionFeesList(params: { enabled?: boolean; [key: string]: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.tuitionFeesList
  );

  const [filter] = useState<any>(null);
  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchTuitionFeesList({
        ...otherParams,
        filter,
      })
    );
  }, [enabled, filter, dispatch, JSON.stringify(otherParams)]);
  const fees: TuitionFees[] = data || [];
  const loading = status === TuitionFeesListStatus.LOADING;

  return {
    fees,
    loading,
    error,
  };
}
