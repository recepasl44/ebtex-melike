// F:\xintra_react_ts\src\components\hooks\employee\refund\useRefundDelete.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { deleteRefund } from "../../../../slices/employee/refund/delete/thunk";
import RefundListStatus from "../../../../enums/employee/refund/list";

export function useRefundDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.refundDelete
  );

  const deleteExistingRefund = useCallback(
    async (id: number) => {
      const action = await dispatch(deleteRefund(id));
      if (deleteRefund.fulfilled.match(action)) {
        return action.payload; // number | null
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === RefundListStatus.LOADING;

  return {
    deletedRefund: data,
    loading,
    error,
    deleteExistingRefund,
  };
}
