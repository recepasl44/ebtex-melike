
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteCurriculum } from "../../../slices/curriculum/delete/thunk";

export function useCurriculumDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.curriculmDelete
  );

  const deleteExistingCurriculum = useCallback(
    async (curriculumId: number) => {
      const resultAction = await dispatch(deleteCurriculum(curriculumId));
      if (deleteCurriculum.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedCurriculum: data, status, error, deleteExistingCurriculum };
}
