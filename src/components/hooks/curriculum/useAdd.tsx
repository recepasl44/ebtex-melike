
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addCurriculum } from "../../../slices/curriculum/add/thunk";
import { CurriculumAddPayload } from "../../../types/curriculum/add";

export function useCurriculumAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.curriculmAdd
  );

  const addNewCurriculum = useCallback(
    async (payload: CurriculumAddPayload) => {
      const resultAction = await dispatch(addCurriculum(payload));
      if (addCurriculum.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedCurriculum: data, status, error, addNewCurriculum };
}
