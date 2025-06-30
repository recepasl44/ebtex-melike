import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addEmployeeEarningsMonth } from "../../../slices/employeeEarningsMonth/add/thunk";
import { EmployeeEarningsMonthAddPayload } from "../../../types/employeeEarningsMonth/add";

export function useEmployeeEarningsMonthAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.employeeEarningsMonthAdd
  );

  const addNewEmployeeEarningsMonth = useCallback(
    async (payload: EmployeeEarningsMonthAddPayload) => {
      const resultAction = await dispatch(addEmployeeEarningsMonth(payload));
      if (addEmployeeEarningsMonth.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    addedEmployeeEarningsMonth: data,
    status,
    error,
    addNewEmployeeEarningsMonth
  };
}
