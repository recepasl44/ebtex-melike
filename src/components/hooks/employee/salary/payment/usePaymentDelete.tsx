import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { RootState } from "../../../../../store/rootReducer";
import { deletePayment } from "../../../../../slices/employee/salary/payment/delete/thunk";
import { PaymentListStatus } from "../../../../../enums/employee/salary/payment/list";

export function usePaymentDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.paymentDelete
  );

  const deleteExistingPayment = useCallback(
    async (id: number) => {
      const action = await dispatch(deletePayment(id));
      if (deletePayment.fulfilled.match(action)) {
        return action.payload; // number | null
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === PaymentListStatus.LOADING;

  return {
    deletedPayment: data,
    loading,
    error,
    deleteExistingPayment,
  };
}
