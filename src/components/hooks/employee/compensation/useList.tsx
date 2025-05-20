// F:\xintra_react_ts\src\components\hooks\employee\compensation\useList.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchCompensationList } from "../../../../slices/employee/compensation/list/thunk";
import CompensationListStatus from "../../../../enums/employee/compensation/list";
import { Compensation, CompensationListArgs } from "../../../../types/employee/compensation/list";

export function useCompensationList(params: CompensationListArgs) {
  const dispatch = useDispatch<AppDispatch>();

  const { data, status, error } = useSelector(
    (state: RootState) => state.compensationList
  );

 const [filter, setFilter] = useState<any>(null);
 
   const { enabled = false, ...otherParams } = params || {};
 
   useEffect(() => {
     if (!enabled) return;
 
     dispatch(
      fetchCompensationList({
         ...otherParams,
         filter,
         enabled: false,
       })
     );
   }, [enabled, filter, dispatch]);

  const compensations: Compensation[] = data || [];
  const loading = status === CompensationListStatus.LOADING;

  return {
    compensations,
    loading,
    error,
    filter,
    setFilter,
  };
}
