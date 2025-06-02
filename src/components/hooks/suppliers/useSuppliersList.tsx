import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchSupplierList } from "../../../slices/suppliers/supplier/list/thunk";
import {
  Supplier,
 SuppliersListArg,
 SuppliersListState,
} from "../../../types/suppliers/supplier/list";
import SuppliersListStatus from "../../../enums/suppliers/list"

export function useSuppliersTable(params :SuppliersListArg ) {
  const dispatch = useDispatch<AppDispatch>();
  const [filter] = useState<any>(null);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);



  const { data, current_page, last_page, total, status, error } = useSelector(
    (state: RootState) => state.supplierList
  ) as SuppliersListState

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;
    dispatch(
      fetchSupplierList({
        ...otherParams,
        filter,
        enabled,
      })
    );
  }, [enabled, filter, dispatch,otherParams.search]);

  const suppliersData: Supplier[] = data || []
  const loading = status === SuppliersListStatus.LOADING
  const errorMsg = error

  return {
    suppliersData,
    page,
    loading,
    error: errorMsg,
    current_page,
    totalPages: last_page,
    totalItems: total,
    pageSize,
    setPage,
    setPageSize,
  }
}
