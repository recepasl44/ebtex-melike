import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { AppDispatch } from '../../../store';
import { fetchAgreements } from '../../../slices/agreements/list/thunk';
import { AgreementsListArg } from '../../../types/agreements/list';
import { AgreementsListStatus } from '../../../enums/agreements/list';

export function useAgreementsList(params: AgreementsListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, meta, status, error } = useSelector((state: RootState) => state.agreementsList);
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);

  useEffect(() => {
    if (params?.enabled === false) return;
    const { enabled, ...restParams } = params;
    const query: AgreementsListArg = {
      ...restParams,
      page,
      pageSize,
      filter,
    };
    dispatch(fetchAgreements(query));
  }, [dispatch, filter, page, pageSize, params]);

  const loading = status === AgreementsListStatus.LOADING;
  const agreementsData = data || [];
  const paginationMeta = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    agreementsData,
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
