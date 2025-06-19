import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchTuitionFeesList } from "../../../../slices/employee/tuition_fees/list/thunk";
import TuitionFeesListStatus from "../../../../enums/employee/tuition_fees/list";
import { TuitionFees } from "../../../../types/employee/tuition_fees/list";

interface UseTuitionFeesListParams {
  enabled?: boolean;
  [key: string]: any;
}

export function useTuitionFeesList(params: UseTuitionFeesListParams) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.tuitionFeesList
  );

  const { enabled, ...otherParams } = params;

  // Params sabit referanslı hale getiriliyor
  const memoizedParams = useMemo(() => {
    return {
      ...otherParams,
      filter: null, // filter sabit, gerekirse yukarıdan parametre olarak da alabilirsin
    };
  }, [JSON.stringify(otherParams)]); // Object değişince sadece yeniden hesaplanır

  useEffect(() => {
    if (!enabled) return;
    dispatch(fetchTuitionFeesList(memoizedParams));
  }, [enabled, dispatch, memoizedParams]);

  const fees: TuitionFees[] = data || [];
  const loading = status === TuitionFeesListStatus.LOADING;

  return {
    fees,
    loading,
    error,
  };
}
