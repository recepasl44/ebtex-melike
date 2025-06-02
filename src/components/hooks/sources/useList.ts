import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { AppDispatch } from '../../../store';
import { fetchSources } from '../../../slices/sources/list/thunk';
import { SourceData, SourceListArg } from '../../../types/sources/list';
import SourcesListStatus from '../../../enums/sources/list';

export function useSourcesList(params: SourceListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 25);
  const [filter, setFilter] = useState<any>(null);

  const { data, meta, status, error } = useSelector((state: RootState) => state.sourcesList);

  useEffect(() => {
    const { enabled = true, ...restParams } = params;
    if (!enabled) return;
    const query: SourceListArg = {
      enabled,
      ...restParams,
      filter,
      page,
      pageSize,
      per_page: pageSize,
    };
    dispatch(fetchSources(query));
  }, [dispatch, filter, page, pageSize]);

  const loading = status === SourcesListStatus.LOADING;
  const sourcesData: SourceData[] = data || [];
  const totalPages = meta ? meta.last_page : 1;
  const totalItems = meta ? meta.total : 0;

  return {
    sourcesData,
    loading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    filter,
    setFilter,
    totalPages,
    totalItems,
  };
}
