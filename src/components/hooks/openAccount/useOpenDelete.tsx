import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteOpenAccount } from "../../../slices/openAccount/delete/thunk";

export function useOpenDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.openAccountDelete
  );

  const removeOpenAccount = useCallback(
    async (openAccountId: number) => {
      const resultAction = await dispatch(deleteOpenAccount(openAccountId));
      if (deleteOpenAccount.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedOpenAccountId: data, status, error, removeOpenAccount };
}
