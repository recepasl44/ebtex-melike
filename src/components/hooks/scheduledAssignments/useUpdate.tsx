import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateScheduledAssignment } from "../../../slices/scheduledAssignments/update/thunk";
import { ScheduledAssignmentsUpdatePayload } from "../../../types/scheduledAssignments/update";

export function useScheduledAssignmentUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.scheduledAssignmentUpdate
  );

  const updateExistingScheduledAssignment = useCallback(
    async (payload: ScheduledAssignmentsUpdatePayload) => {
      const resultAction = await dispatch(updateScheduledAssignment(payload));
      if (updateScheduledAssignment.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    updatedScheduledAssignment: data,
    status,
    error,
    updateExistingScheduledAssignment,
  };
}
