import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchOtherIncomes } from '../../../slices/otherIncome/list/thunk';
import { OtherIncomeData, OtherIncomeMeta, OtherIncomeListArgs } from '../../../types/otherIncome/list';
import { OtherIncomeListStatus } from '../../../enums/otherIncome/list';

export function useOtherIncomeTable(params: OtherIncomeListArgs) {
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState<number>(params.page ?? 1);
  const [paginate, setPaginate] = useState<number>(params.paginate ?? 10);

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.otherIncomeList
  );

  const { enabled = false, ...otherParams } = params;

  useEffect(() => {
    if (!enabled) return;
    dispatch(
      fetchOtherIncomes({
        ...otherParams,
        page,
        paginate,
      })
    );
  }, [enabled, page, paginate, dispatch, otherParams.search]);

  const loading = status === OtherIncomeListStatus.LOADING;
  const otherIncomeData: OtherIncomeData[] = data || [];
  const paginationMeta: OtherIncomeMeta | null = meta;

  const totalPages = paginationMeta?.last_page ?? 1;
  const totalItems = paginationMeta?.total ?? 0;

  return {
    otherIncomeData,
    loading,
    error,
    page,
    paginate,
    totalPages,
    totalItems,
    setPage,
    setPaginate,
  };
}
