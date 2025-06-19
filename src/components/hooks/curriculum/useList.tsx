
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchLevels } from "../../../slices/curriculum/list/thunk";
import { CurriculumListResponse, CurriculumListArg } from "../../../types/curriculum/list";
import { CurriculumListStatus } from "../../../enums/curriculum/list";

export function useCurriculumsTable(params: CurriculumListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState<any>(null);
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.curriculmList
  );

  useEffect(() => {
    if (params?.enabled === false) return;

      const query: CurriculumListArg = { ...params, filter };
      dispatch(fetchLevels(query));
  
  }, [dispatch, filter, params]);

  const loading = status === CurriculumListStatus.LOADING;
  const curriculumsData: CurriculumListResponse["data"] = data || [];
  const paginationMeta: CurriculumListResponse["meta"] | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return { curriculumsData, loading, error, totalPages, totalItems, setFilter };
}
