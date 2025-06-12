import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchdistrict } from "../../../slices/districts/list/thunk";
import {
  IDistrict,
  ListDistrictResponse,
  DistrictListArg,
} from "../../../types/districts/list";
import { DistrictsListStatus } from "../../../enums/discrict/list";

export function useDiscrictTable(params: DistrictListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState<any>(null);
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.districtList
  );
  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchdistrict({
        enabled: true,
        ...otherParams,
        filter,
      })
    );
  }, [enabled, filter, dispatch, JSON.stringify(otherParams)]);

  const loading = status === DistrictsListStatus.LOADING;
  const discrictData: IDistrict[] | null = Array.isArray(data) ? data : data ? [data] : null;
  const paginationMeta: ListDistrictResponse["meta"] | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    data,
    discrictData,
    loading,
    error,
    totalPages,
    totalItems,
    setFilter,
  };
}
