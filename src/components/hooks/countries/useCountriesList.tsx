import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchCountriesList } from "../../../slices/countries/list/thunk";
import {
  CountryListArg,
  ICountry,
 CountryListMeta,
} from "../../../types/countries/list";
import { CountryListStatus } from "../../../enums/countries/list";

export function useCountriesList(params: CountryListArg = {}) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);

  const { data, status, error } = useSelector(
    (state: RootState) => state.countriesList
  );
  const [filter, setFilter] = useState<any>(null);

  const { enabled = false, ...otherParams } = params || {};

  useEffect(() => {
    if (!enabled) return;

    dispatch(
        fetchCountriesList({
        ...otherParams,
        filter,
        enabled: false,
      })
    );
  }, [enabled, filter, dispatch,otherParams.name]);

  const loading = status === CountryListStatus.LOADING;
  const countriesData: ICountry[] = data || [];

  // Extract pagination data from the response
  const pagination: CountryListMeta | null = data
    ? {
        current_page: 1,
        from: 1,
        last_page: 1,
      
        per_page: pageSize,
   
        to: pageSize,
        total: data.length,
      }
    : null;

  const totalPages = pagination ? pagination.last_page : 1;
  const totalItems = pagination ? pagination.total : 0;

  return {
    countriesData,
    loading,
    error,
    data,
  
    page,
    pageSize,
    totalPages,
    totalItems,

    setPage,
    setPageSize,
    setFilter,
  };
}
