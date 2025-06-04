import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchTransferDetail } from "../../../slices/transfers/show/thunk";

export function useTransferShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.transferShow
  );

  const getTransfer = useCallback(
    async (transferId: number) => {
      const resultAction = await dispatch(fetchTransferDetail(transferId));
      if (fetchTransferDetail.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { transfer: data, status, error, getTransfer };
}
