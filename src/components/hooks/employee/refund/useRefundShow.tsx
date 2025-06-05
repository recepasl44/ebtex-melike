// F:\xintra_react_ts\src\components\hooks\employee\refund\useRefundShow.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchRefundDetail } from "../../../../slices/employee/refund/show/thunk";
import RefundListStatus from "../../../../enums/employee/refund/list";
import { Refund } from "../../../../types/employee/refund/list";

export function useRefundShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.refundShow
  );

  const getRefund = useCallback(
    async (id: number) => {
      const action = await dispatch(fetchRefundDetail(id));
      if (fetchRefundDetail.fulfilled.match(action)) {
        return action.payload as Refund;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === RefundListStatus.LOADING;

  return {
    refund: data,
    loading,
    error,
    getRefund,
  };
}
