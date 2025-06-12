import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchLevelDetail } from "../../../slices/levels/detail/thunk";

export function useLevelDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.levelDetail
  );

  const getLevelDetail = useCallback(
    async (levelId: number) => {
      const resultAction = await dispatch(fetchLevelDetail(levelId));
      if (fetchLevelDetail.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { levelDetail: data, status, error, getLevelDetail };
}
