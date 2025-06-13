// F:\xintra_react_ts\src\components\hooks\employee\salary\debt\useDebtShow.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/rootReducer";
import { AppDispatch } from "../../../../../store";
import { fetchDebitDetail } from "../../../../../slices/employee/salary/debt/detail/thunk";
import { Debit } from "../../../../../types/employee/salary/debit/list";
import { DebitListStatus } from "../../../../../enums/employee/salary/debit/list";

export function useDebtShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.debitShow
  );

  const getDebt = useCallback(
    async (id: number) => {
      const action = await dispatch(fetchDebitDetail(id));
      if (fetchDebitDetail.fulfilled.match(action)) {
        return action.payload as Debit;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === DebitListStatus.LOADING;

  return {
    debt: data,
    loading,
    error,
    getDebt,
  };
}
