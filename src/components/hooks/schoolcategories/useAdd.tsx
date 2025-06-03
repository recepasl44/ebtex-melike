import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addSchoolCategory } from "../../../slices/schoolcategories/add/thunk";
import { SchoolCategoriesAddPayload } from "../../../types/schoolcategories/add";

export function useSchoolCategoryAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.schoolCategoriesAdd
  );

  const addNewSchoolCategory = useCallback(
    async (payload: SchoolCategoriesAddPayload) => {
      const resultAction = await dispatch(addSchoolCategory(payload));
      if (addSchoolCategory.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedSchoolCategory: data, status, error, addNewSchoolCategory };
}
