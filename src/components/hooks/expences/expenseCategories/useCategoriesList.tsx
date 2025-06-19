import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchExpenseCategoriesList } from "../../../../slices/expences/expenseCategories/list/thunk";
import {
  IExpenseCategories,
  ExpenseCategoriesListArgs,
  ExpenseCategoriesListResponse,
} from "../../../../types/expences/expenseCategories/list";
import { GetCategoriesListStatus } from "../../../../enums/expense/expenseCategories/list";

export function useCategoriesList(params: ExpenseCategoriesListArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params?.page || 1);
  const [pageSize, setPageSize] = useState<number>(params?.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);
  const { data, status, error } = useSelector(
    (state: RootState) => state.getListCategories
  );

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;
    dispatch(
      fetchExpenseCategoriesList({
        ...otherParams,
        filter,
        enabled: false,
      })
    );
  }, [
    enabled,
    filter,
    dispatch,
    otherParams.id,
    otherParams.page,
    otherParams.pageSize,
  ]);

  const loading = status === GetCategoriesListStatus.LOADING;
  const categoriesData: IExpenseCategories[] = data || [];

  // Get proper pagination data from the API response
  const apiResponse = useSelector<
    RootState,
    ExpenseCategoriesListResponse | null
  >((state) => (state.getListCategories as any).fullResponse);

  // Use the pagination metadata from the API response
  const totalItems = apiResponse ? apiResponse.total : 0;
  const totalPages = apiResponse ? apiResponse.last_page : 1;

  return {
    categoriesData,
    loading,
    error,

    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
    filter,
    setFilter,
  };
}
