import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteSchoolCategory } from "../../../slices/schoolcategories/delete/thunk";

export function useSchoolCategoryDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.schoolCategoriesDelete
  );

  const deleteExistingSchoolCategory = useCallback(
    async (categoryId: number) => {
      const resultAction = await dispatch(deleteSchoolCategory(categoryId));
      if (deleteSchoolCategory.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    deletedSchoolCategory: data,
    status,
    error,
    deleteExistingSchoolCategory,
  };
}
