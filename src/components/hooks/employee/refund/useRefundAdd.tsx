// F:\xintra_react_ts\src\components\hooks\employee\refund\useRefundAdd.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { addRefund } from "../../../../slices/employee/refund/add/thunk";
import { RefundAddPayload } from "../../../../types/employee/refund/add";
import RefundListStatus from "../../../../enums/employee/refund/list";

export function useRefundAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.refundAdd
  );

  const addNewRefund = useCallback(
    async (payload: RefundAddPayload) => {
      const action = await dispatch(addRefund(payload));
      if (addRefund.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === RefundListStatus.LOADING;

  return {
    addedRefund: data,
    loading,
    error,
    addNewRefund,
  };
}
