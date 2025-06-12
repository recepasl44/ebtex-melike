// F:\xintra_react_ts\src\components\hooks\curriculum\useDetail.tsx
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchCurriculumDetail } from "../../../slices/curriculum/detail/thunk";

export function useCurriculumDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.curriculmDetail
  );

  const getCurriculumDetail = useCallback(
    async (curriculumId: number) => {
      const resultAction = await dispatch(fetchCurriculumDetail(curriculumId));
      if (fetchCurriculumDetail.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { curriculumDetail: data, status, error, getCurriculumDetail };
}
