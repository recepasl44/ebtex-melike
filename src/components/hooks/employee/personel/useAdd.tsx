import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { addPersonel } from "../../../../slices/employee/personel/add/thunk";
import { PersonelAddPayload } from "../../../../types/employee/personel/add";

export function usePersonelAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.personelAdd
  );

  const addNewPersonel = useCallback(
    async (payload: PersonelAddPayload) => {
      const resultAction = await dispatch(addPersonel(payload));
      if (addPersonel.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedPersonel: data, status, error, addNewPersonel };
}
