import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/rootReducer";
import { AppDispatch } from "../../../../../store";
import { fetchDebitList } from "../../../../../slices/employee/salary/debt/list/thunk";
import { Debit } from "../../../../../types/employee/salary/debit/list";
import { DebitListStatus } from "../../../../../enums/employee/salary/debit/list";

export function useDebtList(params: { enabled?: boolean; [key: string]: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.debitList
  );
  const [filter, setFilter] = useState<any>(null);

  const { enabled = false, ...otherParams } = params || {};

  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchDebitList({
        ...otherParams,
        filter,
        enabled: false,
      })
    );
  }, [enabled, filter, dispatch]);
  const debts: Debit[] = data || [];
  const loading = status === DebitListStatus.LOADING;

  return {
    debts,
    loading,
    error,
    setFilter,
  };
}
