import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { deleteExpence } from "../../../../slices/expences/main/delete/thunk";

export function useExpenseDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.expencesDelete
  );

  const removeExpence = useCallback(
    async (expenceId: number) => {
      const resultAction = await dispatch(deleteExpence(expenceId));
      if (deleteExpence.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedExpenceId: data, status, error, removeExpence };
}
