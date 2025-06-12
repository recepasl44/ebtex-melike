// F:\xintra_react_ts\src\components\hooks\employee\primler\usePrimlerDelete.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { deletePrimler } from "../../../../slices/employee/primler/delete/thunk";
import PrimlerListStatus from "../../../../enums/employee/primler/list";

export function usePrimlerDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.primlerDelete
  );

  const deleteExistingPrimler = useCallback(
    async (id: number) => {
      const action = await dispatch(deletePrimler(id));
      if (deletePrimler.fulfilled.match(action)) {
        return action.payload; // number | null
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === PrimlerListStatus.LOADING;

  return {
    deletedPrimler: data,
    loading,
    error,
    deleteExistingPrimler,
  };
}
