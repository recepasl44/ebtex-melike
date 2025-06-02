import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchSchools } from "../../../slices/schools/list/thunk";
import {
  ISchool,
  SchoolListArg,
  SchoolListMeta,
} from "../../../types/schools/list";
import { SchoolListStatus } from "../../../enums/schools/list";

export function useSchoolTable(params: SchoolListArg) {
  const dispatch = useDispatch<AppDispatch>();


  const [page, setPage] = useState<number>(params.page || 1);
  const [paginate, setPaginate] = useState<number>(params.paginate ?? params.pageSize ?? 10);
  const [filter, setFilter] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.schoolList
  );

  const { enabled = true, ...otherParams } = params;


  useEffect(() => {
    if (params.paginate !== undefined && params.paginate !== paginate) {
      setPaginate(params.paginate);
    }
    if (params.page !== undefined && params.page !== page) {
      setPage(params.page);
    }
  }, [params.paginate, params.page, paginate, page]);


  useEffect(() => {
    if (!enabled) return;
    dispatch(
      fetchSchools({
        ...otherParams,
        filter,
        paginate,
        page,
        enabled: false,
      })
    );
  }, [
    enabled,
    filter,
    paginate,
    page,
    dispatch,
    otherParams.name,
  ]);

  const loading = status === SchoolListStatus.LOADING;
  const schoolData: ISchool[] = data || [];
  const paginationMeta: SchoolListMeta | null = meta;

  return {
    schoolData,
    loading,
    error,

    page,
    paginate,
    totalPages: paginationMeta?.last_page ?? 1,
    totalItems: paginationMeta?.total ?? 0,

    setPage,
    setPaginate,
    setFilter,
    searchTerm,
    setSearchTerm,
  };
}
