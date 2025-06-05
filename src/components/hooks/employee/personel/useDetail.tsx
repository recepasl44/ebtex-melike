  import { useCallback } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { AppDispatch } from "../../../../store";
  import { RootState } from "../../../../store/rootReducer";
  import { fetchPersonel } from "../../../../slices/employee/personel/detail/thunk";

  export function usePersonelShow() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
      (state: RootState) => state.personelShow
    );

    const getPersonel = useCallback(
      async (personelId: number) => {
        const resultAction = await dispatch(fetchPersonel(personelId));
        if (fetchPersonel.fulfilled.match(resultAction)) {
          return resultAction.payload;
        }
        return null;
      },
      [dispatch]
    );

    return { personel: data, status, error, getPersonel };
  }
