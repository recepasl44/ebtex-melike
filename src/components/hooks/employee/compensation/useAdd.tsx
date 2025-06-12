// F:\xintra_react_ts\src\components\hooks\employee\compensation\useAdd.tsx
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { addCompensation } from "../../../../slices/employee/compensation/add/thunk";
import CompensationListStatus from "../../../../enums/employee/compensation/list";
import { compensationAddPayload } from "../../../../types/employee/compensation/add";

export function useCompensationAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.compensationAdd
  );

  const addNewCompensation = useCallback(
    async (payload: compensationAddPayload) => {
      const result = await dispatch(addCompensation(payload));
      if (addCompensation.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === CompensationListStatus.LOADING;

  return {
    addedCompensation: data,
    loading,
    error,
    addNewCompensation,
  };
}
