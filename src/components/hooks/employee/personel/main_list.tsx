import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchPersonel } from "../../../../slices/employee/personel/list/main_thunk";
import {
  Personel,
  PersonelListArgs,
} from "../../../../types/employee/personel/list";
import PersonelListStatus from "../../../../enums/employee/personel/list"; // Corrected import

export function usePersonnelTable(params: PersonelListArgs) {
  const dispatch = useDispatch<AppDispatch>();

  // Local state
  const [filter, setFilter] = useState<any>(null);
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [searchTerm, setSearchTerm] = useState<string>(params.search || "");

  // Redux state – personelList slice
  const { data, status, error } = useSelector(
    (state: RootState) => state.personelMainList
  );

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;
    dispatch(
      fetchPersonel({
        ...otherParams,
        filter,
      })
    );
  }, [enabled, filter, dispatch]);

  const loading = status === PersonelListStatus.LOADING;
  const personnelData: Personel[] = data || [];

  return {
    personnelData,
    loading,
    error,
    page,
    pageSize,

    setPage,
    setPageSize,
    searchTerm,
    setSearchTerm,
    setFilter,
  };
}
