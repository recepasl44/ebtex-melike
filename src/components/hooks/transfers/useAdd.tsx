import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addTransfer } from "../../../slices/transfers/add/thunk";
import { TransferAddPayload } from "../../../types/transfers/add";

export function useTransferAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.transferAdd
  );

  const addNewTransfer = useCallback(
    async (payload: TransferAddPayload) => {
      const resultAction = await dispatch(addTransfer(payload));
      if (addTransfer.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedTransfer: data, status, error, addNewTransfer };
}
