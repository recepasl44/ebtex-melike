import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchCities } from "../../../slices/cities/list/thunk";
import { City, CityLListArg } from "../../../types/city/list";
import { CityListStatus } from "../../../enums/city/list";
export function useCityTable(params: CityLListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params?.page || 1);
  const [pageSize, setPageSize] = useState<number>(params?.pageSize || 10);

  const { data, status, error } = useSelector(
    (state: RootState) => state.cityListSlice
  );

  const [filter, setFilter] = useState<any>(null);

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchCities({
        ...otherParams,
        filter,
      })
    );
  }, [enabled, filter, dispatch, JSON.stringify(otherParams)]);
  const loading = status === CityListStatus.LOADING;
  const cityData: City[] = data || [];

  return {
    cityData,
    data,
    loading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    filter,
    setFilter,
   
  };
}
