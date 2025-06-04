import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchTransfers } from "../../../slices/transfers/list/thunk";
import {
  TransferData,
  TransferMeta,
  TransferListArg,
} from "../../../types/transfers/list";
import { TransferListStatus } from "../../../enums/transfers/list";

export function useTransfersTable(params: TransferListArg) {
  const dispatch = useDispatch<AppDispatch>();


  const [filter, setFilter] = useState<any>(null);

  const [page, setPage] = useState<number>(params.page ?? 1);

  const [paginate, setPaginate] = useState<number>(params.paginate ?? 10);

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.transferList
  );

  const { enabled = false, ...otherParams } = params;

  useEffect(() => {
    if (!enabled) return;
    dispatch(
      fetchTransfers({
        ...otherParams,
        filter,
        page,
        paginate,
      })
    );
  }, [
    enabled,
    filter,
    page,
    paginate,
    dispatch,

    otherParams.someArg1,
    otherParams.someArg2,
  ]);

  const loading = status === TransferListStatus.LOADING;
  const transfersData: TransferData[] = data || [];
  const paginationMeta: TransferMeta | null = meta;

  const totalPages = paginationMeta?.last_page ?? 1;
  const totalItems = paginationMeta?.total ?? 0;

  return {
    transfersData,
    loading,
    error,
    page,
    paginate,
    totalPages,
    totalItems,
    setPage,
    setPaginate,
    setFilter,
  };
}
