// src/hooks/employee/personel/useDailyDataAdd.ts
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { addDailyData } from "../../../../slices/employee/dailyData/add/thunk";
import {
  SaveDailyDataPayload,
  DailyDataAddState,
} from "../../../../types/employee/dailydata/add";

export function useDailyDataAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.dailyDataAdd
  ) as DailyDataAddState;

  const addNew = useCallback(
    async (payload: SaveDailyDataPayload) => {
      const result = await dispatch(addDailyData(payload));
      if (addDailyData.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    added: data,
    loading: status === "loading",
    error,
    addNewDailyData: addNew,
  };
}
