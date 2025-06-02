import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateSchoolCategory } from "../../../slices/schoolcategories/update/thunk";
import { SchoolCategoriesUpdatePayload } from "../../../types/schoolcategories/update";

export function useSchoolCategoryUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.schoolCategoriesUpdate
  );

  const updateExistingSchoolCategory = useCallback(
    async (payload: SchoolCategoriesUpdatePayload) => {
      const resultAction = await dispatch(updateSchoolCategory(payload));
      if (updateSchoolCategory.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    updatedSchoolCategory: data,
    status,
    error,
    updateExistingSchoolCategory,
  };
}
