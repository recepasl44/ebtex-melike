import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteEmployeeEarningsMonth } from "../../../slices/employeeEarningsMonth/delete/thunk";

export function useEmployeeEarningsMonthDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.employeeEarningsMonthDelete
  );

  const deleteExistingEmployeeEarningsMonth = useCallback(
    async (id: number) => {
      const resultAction = await dispatch(deleteEmployeeEarningsMonth(id));
      if (deleteEmployeeEarningsMonth.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    deletedEmployeeEarningsMonth: data,
    status,
    error,
    deleteExistingEmployeeEarningsMonth
  };
}
