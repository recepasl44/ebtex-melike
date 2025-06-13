import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { updatePersonel } from "../../../../slices/employee/personel/update/thunk";
import { PersonelUpdatePayload } from "../../../../types/employee/personel/update";

export function usePersonelUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.personelUpdate
  );

  const updateExistingPersonel = useCallback(
    async (payload: PersonelUpdatePayload) => {
      const resultAction = await dispatch(updatePersonel(payload));
      if (updatePersonel.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedPersonel: data, status, error, updateExistingPersonel };
}
