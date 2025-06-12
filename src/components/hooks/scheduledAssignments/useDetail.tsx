import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchScheduledAssignment } from "../../../slices/scheduledAssignments/detail/thunk";

export function useScheduledAssignmentShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.scheduledAssignmentDetail
  );

  const getScheduledAssignment = useCallback(
    async (scheduledAssignmentId: number) => {
      const resultAction = await dispatch(
        fetchScheduledAssignment(scheduledAssignmentId)
      );
      if (fetchScheduledAssignment.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { scheduledAssignment: data, status, error, getScheduledAssignment };
}
