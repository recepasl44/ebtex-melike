import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateEmployeeEarningsMonth } from "../../../slices/employeeEarningsMonth/update/thunk";
import { EmployeeEarningsMonthUpdatePayload } from "../../../types/employeeEarningsMonth/update";

export function useEmployeeEarningsMonthUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.employeeEarningsMonthUpdate
  );

  const updateExistingEmployeeEarningsMonth = useCallback(
    async (payload: EmployeeEarningsMonthUpdatePayload) => {
      const resultAction = await dispatch(updateEmployeeEarningsMonth(payload));
      if (updateEmployeeEarningsMonth.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    updatedEmployeeEarningsMonth: data,
    status,
    error,
    updateExistingEmployeeEarningsMonth
  };
}
