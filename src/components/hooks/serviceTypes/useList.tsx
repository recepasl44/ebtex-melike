import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchServicetypes } from "../../../slices/serviceTypes/list/thunk";
import {
  ServicetypesData,
  ServicetypesMeta,
  ServicetypesListArg,
} from "../../../types/serviceTypes/list";
import { ServicetypesListStatus } from "../../../enums/serviceTypes/list";

export function useServiceTypesList(params: ServicetypesListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.serviceTypesList
  );
  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (params?.enabled === false) return;
    dispatch(
      fetchServicetypes({
        enabled,
        ...otherParams,
        filter,
        page,
        pageSize,
      })
    );
  }, [enabled, dispatch, filter, page, pageSize, otherParams.name]);

  const loading = status === ServicetypesListStatus.LOADING;
  const servicetypesData: ServicetypesData[] = data || [];
  const paginationMeta: ServicetypesMeta | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    servicetypesData,
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
    searchTerm,
    setSearchTerm,
  };
}
