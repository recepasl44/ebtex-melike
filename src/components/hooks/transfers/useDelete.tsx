import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { deleteTransfer } from "../../../slices/transfers/delete/thunk";

export function useTransferDelete() {
  const dispatch = useDispatch<AppDispatch>();

  const deleteExistingTransfer = useCallback(
    async (transferId: number): Promise<boolean> => {
      const resultAction = await dispatch(deleteTransfer(transferId));
      if (deleteTransfer.fulfilled.match(resultAction)) {
        return true;
      }
      return false;
    },
    [dispatch]
  );

  return { deleteExistingTransfer };
}
