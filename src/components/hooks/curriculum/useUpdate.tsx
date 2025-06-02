
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateCurriculum } from "../../../slices/curriculum/update/thunk";
import { CurriculumUpdatePayload } from "../../../types/curriculum/update";

export function useCurriculumUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.curriculmUpdate
  );

  const updateExistingCurriculum = useCallback(
    async (payload: CurriculumUpdatePayload) => {
      const resultAction = await dispatch(updateCurriculum(payload));
      if (updateCurriculum.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedCurriculum: data, status, error, updateExistingCurriculum };
}
