import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchCreditCardList } from "../../../slices/creditCard/list/thunk";
import {
  CreditCardListArgs,
  ICreditCard,
  ICreditCardPaginate,
} from "../../../types/creditCard/list";
import { CreditCardListStatus } from "../../../enums/creditCard/list";

export function useCreditCardTable(params: CreditCardListArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params?.page || 1);
  const [pageSize, setPageSize] = useState<number>(params?.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);
  const { data, status, error } = useSelector(
    (state: RootState) => state.creditCardList
  );
  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;
    dispatch(
      fetchCreditCardList({
        ...otherParams,
        filter,
        enabled: false,
      })
    );
  }, [enabled, filter, dispatch]);
  const loading = status === CreditCardListStatus.LOADING;
  const creditCardData: ICreditCard[] = data || [];

  // Extract pagination data from the response
  const pagination: ICreditCardPaginate | null = data
    ? {
        current_page: 1,
        first_page_url: "",
        from: 1,
        last_page: 1,
        last_page_url: "",
        next_page_url: null,
        path: "",
        per_page: pageSize,
        prev_page_url: null,
        to: pageSize,
        total: data.length,
      }
    : null;

  const totalPages = pagination ? pagination.last_page : 1;
  const totalItems = pagination ? pagination.total : 0;

  return {
    creditCardData,
    loading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    totalItems,
    setFilter,
  };
}
