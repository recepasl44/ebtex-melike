import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteLevel } from "../../../slices/levels/delete/thunk";

export function useLevelDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.levelDelete
  );

  const deleteExistingLevel = useCallback(
    async (levelId: number) => {
      const resultAction = await dispatch(deleteLevel(levelId));
      if (deleteLevel.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedLevel: data, status, error, deleteExistingLevel };
}
