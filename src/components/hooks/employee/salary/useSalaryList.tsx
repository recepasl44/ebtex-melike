import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchSalaryList } from "../../../../slices/employee/salary/list/thunk";
import { Salary, SalaryListArgs } from "../../../../types/employee/salary/list";
import { SalaryListStatus } from "../../../../enums/employee/salary/list";

export function useSalaryList(params: SalaryListArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.salaryList
  );

  /* --- filtre lokali (opsiyonel) --- */
  const [filter, setFilter] = useState<any>(null);

  const {
    enabled = true,
    page,
    pageSize,
    personel_id,
    search,
  } = params;

  useEffect(() => {
    if (enabled === false) return;

    dispatch(
      fetchSalaryList({
        page,
        pageSize,
        personel_id,
        search,
        filter,
      } as any)
    );
  }, [enabled, page, pageSize, personel_id, search, filter, dispatch]);
  //  ↑↑ yalnızca primitive'ler – referans problemi yok

  const salaries: Salary[] = data || [];
  const loading = status === SalaryListStatus.LOADING;

  return { salaries, loading, error, setFilter };
}
