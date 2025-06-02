// F:\xintra_react_ts\src\components\hooks\employee\salary\debt\useDebtAdd.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { RootState } from "../../../../../store/rootReducer";
import { addDebit } from "../../../../../slices/employee/salary/debt/add/thunk";
import { DebitAddPayload } from "../../../../../types/employee/salary/debit/add";
import { DebitListStatus } from "../../../../../enums/employee/salary/debit/list";

export function useDebtAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.debitAdd
  );

  const addNewDebt = useCallback(
    async (payload: DebitAddPayload) => {
      const action = await dispatch(addDebit(payload));
      if (addDebit.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === DebitListStatus.LOADING;

  return {
    addedDebt: data,
    loading,
    error,
    addNewDebt,
  };
}
