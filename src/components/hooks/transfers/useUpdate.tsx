import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateTransfer } from "../../../slices/transfers/update/thunk";
import { TransferUpdatePayload } from "../../../types/transfers/update";

export function useTransferUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.transferUpdate
  );

  const updateExistingTransfer = useCallback(
    async (payload: TransferUpdatePayload) => {
      const resultAction = await dispatch(updateTransfer(payload));
      if (updateTransfer.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedTransfer: data, status, error, updateExistingTransfer };
}
