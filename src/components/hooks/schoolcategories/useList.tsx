import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchSchoolCategories } from "../../../slices/schoolcategories/list/thunk";
import {
  SchoolCategoriesListArg,
  SchoolCategoryData,
  SchoolCategoryMeta,
} from "../../../types/schoolcategories/list";
import SchoolCategoriesListStatus from "../../../enums/schoolcategories/list";

export function useSchoolCategoriesList(params: SchoolCategoriesListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.schoolCategoriesList
  );
  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchSchoolCategories({
        ...otherParams,
        filter,
        enabled,
        page,
        pageSize,
        per_page: pageSize,
      })
    );
  }, [
    dispatch,
    filter,
    enabled,
    otherParams.name,
    otherParams.page,
    otherParams.pageSize,
  ]);

  const loading = status === SchoolCategoriesListStatus.LOADING;
  const listData: SchoolCategoryData[] = data || [];
  const paginationMeta: SchoolCategoryMeta | null = meta || null;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    listData,
    loading,
    error,
    paginationMeta,
    page,
    pageSize,
    setPage,
    setPageSize,
    setFilter,
    searchTerm,
    setSearchTerm,
    totalItems,
    totalPages,
  };
}
