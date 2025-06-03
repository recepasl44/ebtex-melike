import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchSchoolCategory } from "../../../slices/schoolcategories/show/thunk";

export function useSchoolCategoryDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.schoolCategoriesShow
  );

  const getSchoolCategory = useCallback(
    async (categoryId: number) => {
      const resultAction = await dispatch(fetchSchoolCategory(categoryId));
      if (fetchSchoolCategory.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { schoolCategory: data, status, error, getSchoolCategory };
}
