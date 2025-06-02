// F:\xintra_react_ts\src\components\hooks\employee\primler\usePrimlerShow.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchPrimlerDetail } from "../../../../slices/employee/primler/show/thunk";
import { Primler } from "../../../../types/employee/primler/list";
import PrimlerListStatus from "../../../../enums/employee/primler/list";

export function usePrimlerShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.primlerShow
  );

  const getPrimler = useCallback(
    async (id: number) => {
      const action = await dispatch(fetchPrimlerDetail(id));
      if (fetchPrimlerDetail.fulfilled.match(action)) {
        return action.payload as Primler;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === PrimlerListStatus.LOADING;

  return {
    primlerDetail: data,
    loading,
    error,
    getPrimler,
  };
}
