// F:\xintra_react_ts\src\components\hooks\employee\compensation\useDelete.tsx
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { deleteCompensation } from "../../../../slices/employee/compensation/delete/thunk";
import CompensationListStatus from "../../../../enums/employee/compensation/list";

export function useCompensationDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.compensationDelete
  );

  const deleteExistingCompensation = useCallback(
    async (compensationId: number) => {
      const result = await dispatch(deleteCompensation(compensationId));
      if (deleteCompensation.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === CompensationListStatus.LOADING;

  return {
    deletedCompensation: data,
    loading,
    error,
    deleteExistingCompensation,
  };
}
