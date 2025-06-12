import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchCoachingList } from "../../../../slices/employee/coaching/list/thunk";
import { CoachingListStatus } from "../../../../enums/employee/coaching/list";
import { Coaching } from "../../../../types/employee/coaching/list";

interface UseCoachingListArgs {
  enabled?: boolean;
  [key: string]: any; // sayfa param, search vb.
}

export function useCoachingList(params: UseCoachingListArgs) {
  const dispatch = useDispatch<AppDispatch>();

  const { data, status, error } = useSelector(
    (state: RootState) => state.coachingList
  );

  const [filter] = useState<any>(null);
  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(fetchCoachingList({
      ...otherParams,
      filter,
    }));
  }, [enabled, filter, dispatch, otherParams]);

  const coachings: Coaching[] = data || [];
  const loading = status === CoachingListStatus.LOADING;

  return {
    coachings,
    loading,
    error,
    filter,
    
  };
}
