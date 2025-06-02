// src/hooks/employee/personel/useDailyDataDelete.ts
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { deleteDailyData } from "../../../../slices/employee/dailyData/delete/thunk";
import { DailyDataDeleteState } from "../../../../types/employee/dailydata/delete"

export function useDailyDataDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector(
    (state: RootState) => state.dailyDataDelete
  ) as DailyDataDeleteState;

  const remove = useCallback(
    async (id: number) => {
      const result = await dispatch(deleteDailyData(id));
      if (deleteDailyData.fulfilled.match(result)) {
        return true;
      }
      return false;
    },
    [dispatch]
  );

  return {
    loading: status === "loading",
    error,
    deleteDailyData: remove,
  };
}
