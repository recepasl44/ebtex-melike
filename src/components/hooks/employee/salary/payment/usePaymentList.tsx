import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { RootState } from "../../../../../store/rootReducer";
import { fetchPaymentList } from "../../../../../slices/employee/salary/payment/list/thunk";
import { Payment } from "../../../../../types/employee/salary/payment/list";
import { PaymentListStatus } from "../../../../../enums/employee/salary/payment/list";

export function usePaymentList(params: { enabled?: boolean; [key: string]: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.paymentList
  );

  const [filter, _setFilter] = useState<any>(null);

  const { enabled = false, ...otherParams } = params || {};

  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchPaymentList({
        ...otherParams,
        filter,
        enabled: false,
      })
    );
  }, [enabled, filter, dispatch]);
  const payments: Payment[] = data || [];
  const loading = status === PaymentListStatus.LOADING;

  return {
    payments,
    loading,
    error,
  };
}
