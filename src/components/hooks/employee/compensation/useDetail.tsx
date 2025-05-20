// F:\xintra_react_ts\src\components\hooks\employee\compensation\useShow.tsx
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchCompensationDetail } from "../../../../slices/employee/compensation/show/thunk";
import CompensationListStatus from "../../../../enums/employee/compensation/list";

export function useCompensationShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.compensationShow
  );

  const getCompensation = useCallback(
    async (compId: number) => {
      const action = await dispatch(fetchCompensationDetail(compId));
      if (fetchCompensationDetail.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === CompensationListStatus.LOADING;

  return {
    compensation: data,
    loading,
    error,
    getCompensation,
  };
}
