import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addSchool } from "../../../slices/schools/add/thunk";
import { ISchoolAddPayload } from "../../../types/schools/add";

export function useSchoolAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.schoolAdd
  );

  const addNewSchool = useCallback(
    async (payload: ISchoolAddPayload) => {
      const resultAction = await dispatch(addSchool(payload));
      if (addSchool.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedSchool: data, status, error, addNewSchool };
}
