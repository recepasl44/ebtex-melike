import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { RootState } from "../../../../../store/rootReducer";
import { fetchPaymentDetail } from "../../../../../slices/employee/salary/payment/detail/thunk";
import { Payment } from "../../../../../types/employee/salary/payment/list";
import { PaymentListStatus } from "../../../../../enums/employee/salary/payment/list";

export function usePaymentShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.paymentShow
  );

  const getPayment = useCallback(
    async (id: number) => {
      const action = await dispatch(fetchPaymentDetail(id));
      if (fetchPaymentDetail.fulfilled.match(action)) {
        return action.payload as Payment;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === PaymentListStatus.LOADING;

  return {
    payment: data,
    loading,
    error,
    getPayment,
  };
}
