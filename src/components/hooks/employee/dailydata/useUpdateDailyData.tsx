// src/hooks/employee/personel/useDailyDataUpdate.ts
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { updateDailyData } from "../../../../slices/employee/dailyData/update/thunk";
import {
  UpdateDailyDataPayload,
  DailyDataUpdateState,
} from "../../../../types/employee/dailydata/update";

export function useDailyDataUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector(
    (state: RootState) => state.dailyDataUpdate
  ) as DailyDataUpdateState;

  const update = useCallback(
    async (payload: UpdateDailyDataPayload) => {
      const result = await dispatch(updateDailyData(payload));
      if (updateDailyData.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    loading: status === "loading",
    error,
    updateDailyData: update,
  };
}
