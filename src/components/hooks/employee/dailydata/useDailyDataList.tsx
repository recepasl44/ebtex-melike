
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { fetchDailyDataList } from "../../../../slices/employee/dailyData/list/thunk";
import {
  DailyDataListArgs,
  DailyDataListState,
} from "../../../../types/employee/dailydata/list";

export function useDailyDataList(params: DailyDataListArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.dailyDataList
  ) as DailyDataListState;

  const loadList = useCallback(
    async (args: DailyDataListArgs) => {
      const result = await dispatch(fetchDailyDataList(args));
      if (fetchDailyDataList.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  useEffect(() => {
    if (status === "idle") {
      loadList(params);
    }
  }, [loadList, params, status]);

  return {
    dailyData: data,
    loading: status === "loading",
    error,
    loadList,
  };
}
