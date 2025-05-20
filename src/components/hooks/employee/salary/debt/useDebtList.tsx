import { useEffect } from "react";
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

  useEffect(() => {
    if (params.enabled === false) return;
    dispatch(fetchDebitList(params));
  }, [params, dispatch]);

  const debts: Debit[] = data || [];
  const loading = status === DebitListStatus.LOADING;

  return {
    debts,
    loading,
    error,
  };
}
