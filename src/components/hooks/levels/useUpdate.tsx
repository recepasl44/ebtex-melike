import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateLevel } from "../../../slices/levels/update/thunk";
import { LevelUpdatePayload } from "../../../types/levels/update";

export function useLevelUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.levelUpdate
  );

  const updateExistingLevel = useCallback(
    async (payload: LevelUpdatePayload) => {
      const resultAction = await dispatch(updateLevel(payload));
      if (updateLevel.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedLevel: data, status, error, updateExistingLevel };
}
