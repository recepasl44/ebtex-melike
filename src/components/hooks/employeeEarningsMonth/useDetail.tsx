import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchEmployeeEarningsMonth } from "../../../slices/employeeEarningsMonth/detail/thunk";

export function useEmployeeEarningsMonthShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.employeeEarningsMonthShow
  );

  const getEmployeeEarningsMonth = useCallback(
    async (id: number) => {
      const resultAction = await dispatch(fetchEmployeeEarningsMonth(id));
      if (fetchEmployeeEarningsMonth.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    employeeEarningsMonth: data,
    status,
    error,
    getEmployeeEarningsMonth
  };
}
