import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchDiscounts } from "../../../slices/discounts/list/thunk";
import {
  DiscountData,
  DiscountListArg,
  DiscountMeta,
} from "../../../types/discounts/list";
import { DiscountListStatus } from "../../../enums/discounts/list";

export function useDiscountsTable(params: DiscountListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.discountList
  );
  const { enabled, ...otherParams } = params;

  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchDiscounts({
        enabled,
        ...otherParams,
        filter,
      })
    );
  }, [
    enabled,
    filter,
    dispatch,

    otherParams.program_id,
    otherParams.page,
    otherParams.pageSize,
    otherParams.name,
    otherParams.service_id,
  ]);

  const loading = status === DiscountListStatus.LOADING;
  const discountsData: DiscountData[] = data || [];
  const paginationMeta: DiscountMeta | null = meta || null;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    discountsData,
    loading,
    error,
    data,
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
