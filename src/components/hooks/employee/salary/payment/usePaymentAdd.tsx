
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { RootState } from "../../../../../store/rootReducer";
import { addPayment } from "../../../../../slices/employee/salary/payment/add/thunk";
import { PaymentAddPayload } from "../../../../../types/employee/salary/payment/add";
import { PaymentListStatus } from "../../../../../enums/employee/salary/payment/list";

export function usePaymentAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.paymentAdd
  );

  const addNewPayment = useCallback(
    async (payload: PaymentAddPayload) => {
      const action = await dispatch(addPayment(payload));
      if (addPayment.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === PaymentListStatus.LOADING;

  return {
    addedPayment: data,
    loading,
    error,
    addNewPayment,
  };
}
