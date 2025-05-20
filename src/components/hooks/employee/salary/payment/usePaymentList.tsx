import { useEffect } from "react";
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

  useEffect(() => {
    if (params.enabled === false) return;
    dispatch(fetchPaymentList(params));
  }, [params, dispatch]);

  const payments: Payment[] = data || [];
  const loading = status === PaymentListStatus.LOADING;

  return {
    payments,
    loading,
    error,
  };
}
