import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { deletePersonel } from "../../../../slices/employee/personel/delete/thunk";

export function usePersonelDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.personelDelete
  );

  const deleteExistingPersonel = useCallback(
    async (personelId: number) => {
      const resultAction = await dispatch(deletePersonel(personelId));
      if (deletePersonel.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedPersonel: data, status, error, deleteExistingPersonel };
}
