// F:\xintra_react_ts\src\components\hooks\employee\compensation\useUpdate.tsx
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { updateCompensation } from "../../../../slices/employee/compensation/update/thunk";
import CompensationListStatus from "../../../../enums/employee/compensation/list";
import { CompensationUpdatePayload } from "../../../../types/employee/compensation/update";

export function useCompensationUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.compensationUpdate
  );

  const updateExistingCompensation = useCallback(
    async (payload: CompensationUpdatePayload) => {
      const result = await dispatch(updateCompensation(payload));
      if (updateCompensation.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === CompensationListStatus.LOADING;

  return {
    updatedCompensation: data,
    loading,
    error,
    updateExistingCompensation,
  };
}
