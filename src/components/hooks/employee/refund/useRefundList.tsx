// F:\xintra_react_ts\src\components\hooks\employee\refund\useRefundList.tsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchRefundList } from "../../../../slices/employee/refund/list/thunk";
import RefundListStatus from "../../../../enums/employee/refund/list";
import { Refund } from "../../../../types/employee/refund/list";

export function useRefundList(params: { enabled?: boolean; [key: string]: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.refundList
  );

  useEffect(() => {
    if (params.enabled === false) return;
    dispatch(fetchRefundList(params));
  }, [params, dispatch]);

  const refunds: Refund[] = data || [];
  const loading = status === RefundListStatus.LOADING;

  return {
    refunds,
    loading,
    error,
  };
}
