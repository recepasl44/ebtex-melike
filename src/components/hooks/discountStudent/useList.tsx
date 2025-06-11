import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchDiscountStudents } from "../../../slices/discountStudent/list/thunk";
import { DiscountStudentData, DiscountStudentMeta } from "../../../types/discountStudent/list";
import { DiscountStudentListStatus } from "../../../enums/discountStudent/list";

export function useDiscountStudentTable() {
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [schoolLevel, setSchoolLevel] = useState<string>("");
  const [classLevel, setClassLevel] = useState<string>("");
  const [classBranch, setClassBranch] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.discountStudentList
  );

  useEffect(() => {
    dispatch(
      fetchDiscountStudents({
        page,
        paginate: pageSize,
        school_level: schoolLevel,
        class_level: classLevel,
        class_branch: classBranch,
        full_name: fullName,
      })
    );
  }, [dispatch, page, pageSize, schoolLevel, classLevel, classBranch, fullName]);

  const loading = status === DiscountStudentListStatus.LOADING;
  const discountStudentData: DiscountStudentData[] = data || [];
  const paginationMeta: DiscountStudentMeta | null = meta;

  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    discountStudentData,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
    schoolLevel,
    setSchoolLevel,
    classLevel,
    setClassLevel,
    classBranch,
    setClassBranch,
    fullName,
    setFullName,
  };
}
