// F:\xintra_react_ts\src\components\hooks\employee\primler\usePrimlerUpdate.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { updatePrimler } from "../../../../slices/employee/primler/update/thunk";
import { PrimlerUpdatePayload } from "../../../../types/employee/primler/update";
import PrimlerListStatus from "../../../../enums/employee/primler/list";

export function usePrimlerUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.primlerUpdate
  );

  const updateExistingPrimler = useCallback(
    async (payload: PrimlerUpdatePayload) => {
      const action = await dispatch(updatePrimler(payload));
      if (updatePrimler.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === PrimlerListStatus.LOADING;

  return {
    updatedPrimler: data,
    loading,
    error,
    updateExistingPrimler,
  };
}
