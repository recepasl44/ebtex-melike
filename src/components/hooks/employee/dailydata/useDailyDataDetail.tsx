// src/hooks/employee/personel/useDailyDataDetail.ts
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { fetchDailyDataDetail } from "../../../../slices/employee/dailyData/detail/thunk";
import { DailyDataDetailState } from "../../../../types/employee/dailydata/detail";

export function useDailyDataDetail(id?: number) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.dailyDataDetail
  ) as DailyDataDetailState;

  const loadDetail = useCallback(
    async (rowId: number) => {
      const result = await dispatch(fetchDailyDataDetail(rowId));
      if (fetchDailyDataDetail.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  useEffect(() => {
    if (id != null && status === "idle") {
      loadDetail(id);
    }
  }, [id, loadDetail, status]);

  return {
    dailyDataRow: data,
    loading: status === "loading",
    error,
    loadDetail,
  };
}
