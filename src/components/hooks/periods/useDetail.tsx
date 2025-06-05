import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchPeriod } from "../../../slices/periods/detail/thunk";

export function usePeriodDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.periodsDetail
  );

  const getPeriod = useCallback(
    async (periodId: number) => {
      const resultAction = await dispatch(fetchPeriod(periodId));
      if (fetchPeriod.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { period: data, status, error, getPeriod };
}
