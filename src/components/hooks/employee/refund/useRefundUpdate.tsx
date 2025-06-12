// F:\xintra_react_ts\src\components\hooks\employee\refund\useRefundUpdate.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { updateRefund } from "../../../../slices/employee/refund/update/thunk";
import { RefundUpdatePayload } from "../../../../types/employee/refund/update";
import RefundListStatus from "../../../../enums/employee/refund/list";

export function useRefundUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.refundUpdate
  );

  const updateExistingRefund = useCallback(
    async (payload: RefundUpdatePayload) => {
      const action = await dispatch(updateRefund(payload));
      if (updateRefund.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === RefundListStatus.LOADING;

  return {
    updatedRefund: data,
    loading,
    error,
    updateExistingRefund,
  };
}
