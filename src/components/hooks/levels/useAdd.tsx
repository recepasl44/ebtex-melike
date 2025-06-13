import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addLevel } from "../../../slices/levels/add/thunk";
import { LevelAddPayload } from "../../../types/levels/add";

export function useLevelAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.levelAdd
  );

  const addNewLevel = useCallback(
    async (payload: LevelAddPayload) => {
      const resultAction = await dispatch(addLevel(payload));
      if (addLevel.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedLevel: data, status, error, addNewLevel };
}
