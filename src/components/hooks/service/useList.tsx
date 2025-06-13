import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchServices } from "../../../slices/services/list/thunk";
import { IService, ServiceListArg, Meta } from "../../../types/services/list";
import { ServicesListStatus } from "../../../enums/service/list";

export function useServicesTable(params: ServiceListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.serviceList
  );

  useEffect(() => {
    if (params?.enabled === false) return;
    const { enabled = true, ...otherParams } = params;
    const query: ServiceListArg = {
      enabled,
      ...otherParams,
      filter,
      page,
      pageSize,
      per_page: pageSize,
    };
    dispatch(fetchServices(query));
  }, [dispatch, filter, page, pageSize, ...Object.values(params || {})]);

  const loading = status === ServicesListStatus.LOADING;
  const servicesData: IService[] = data || [];
  const paginationMeta: Meta | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    
    data,
    refetch:
    servicesData,
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
