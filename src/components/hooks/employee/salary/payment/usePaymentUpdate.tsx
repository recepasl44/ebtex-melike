import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { RootState } from "../../../../../store/rootReducer";
import { updatePayment } from "../../../../../slices/employee/salary/payment/update/thunk";
import { PaymentUpdatePayload } from "../../../../../types/employee/salary/payment/update";
import { PaymentListStatus } from "../../../../../enums/employee/salary/payment/list";

export function usePaymentUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.paymentUpdate
  );

  const updateExistingPayment = useCallback(
    async (payload: PaymentUpdatePayload) => {
      const action = await dispatch(updatePayment(payload));
      if (updatePayment.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === PaymentListStatus.LOADING;

  return {
    updatedPayment: data,
    loading,
    error,
    updateExistingPayment,
  };
}
