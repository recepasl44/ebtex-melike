// F:\xintra_react_ts\src\components\hooks\employee\primler\usePrimlerAdd.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { addPrimler } from "../../../../slices/employee/primler/add/thunk";
import { PrimlerAddPayload } from "../../../../types/employee/primler/add";
import PrimlerListStatus from "../../../../enums/employee/primler/list";

export function usePrimlerAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.primlerAdd
  );

  const addNewPrimler = useCallback(
    async (payload: PrimlerAddPayload) => {
      const action = await dispatch(addPrimler(payload));
      if (addPrimler.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === PrimlerListStatus.LOADING;

  return {
    addedPrimler: data,
    loading,
    error,
    addNewPrimler,
  };
}
