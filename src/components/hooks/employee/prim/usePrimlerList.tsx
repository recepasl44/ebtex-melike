// F:\xintra_react_ts\src\components\hooks\employee\primler\usePrimlerList.tsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchPrimlerList } from "../../../../slices/employee/primler/list/thunk";
import { Primler } from "../../../../types/employee/primler/list";
import PrimlerListStatus from "../../../../enums/employee/primler/list";

interface UsePrimlerListParams {
  enabled?: boolean;
  personel_id?: number;
}

export function usePrimlerList({ enabled = true, personel_id }: UsePrimlerListParams) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.primlerList);

  useEffect(() => {
    if (!enabled || personel_id == null) return;
    dispatch(fetchPrimlerList({ personel_id }));
  }, [enabled, personel_id, dispatch]);

  return {
    primler: data || [],
    loading: status === PrimlerListStatus.LOADING,
    error,
  };
}
