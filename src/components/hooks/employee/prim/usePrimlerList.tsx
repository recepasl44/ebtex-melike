// F:\xintra_react_ts\src\components\hooks\employee\primler\usePrimlerList.tsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchPrimlerList } from "../../../../slices/employee/primler/list/thunk";
import { Primler } from "../../../../types/employee/primler/list";
import PrimlerListStatus from "../../../../enums/employee/primler/list";

export function usePrimlerList(params: { enabled?: boolean; [key: string]: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.primlerList
  );
  const [filter] = useState<any>(null);
  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(fetchPrimlerList({
      ...otherParams,
      filter,
    }));
  }, [enabled, filter, dispatch, otherParams]);

  const primler: Primler[] = data || [];
  const loading = status === PrimlerListStatus.LOADING;

  return {
    primler,
    loading,
    error,
  };
}
