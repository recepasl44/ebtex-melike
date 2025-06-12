import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchCostPlanningList } from "../../../../slices/employee/cost_planning/list/thunk";
import { PersonelCostPlanning, CostPlanningListArgs } from "../../../../types/employee/cost_planning/list";
import CostPlanningListStatus from "../../../../enums/employee/cost_planning/list";

export function useCostPlanningList(params: CostPlanningListArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.costPlanningList
  );

  const { enabled = true, ...otherParams } = params;

  useEffect(() => {
    if (!enabled) return;
    dispatch(fetchCostPlanningList(otherParams));
  }, [enabled, dispatch, otherParams]);

  const planning: PersonelCostPlanning[] = data || [];
  const loading = status === CostPlanningListStatus.LOADING;

  return { planning, loading, error };
}