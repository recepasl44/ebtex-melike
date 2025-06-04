import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addScheduledAssignment } from "../../../slices/scheduledAssignments/add/thunk";
import { ScheduledAssignmentsAddPayload } from "../../../types/scheduledAssignments/add";

export function useScheduledAssignmentAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.scheduledAssignmentAdd
  );

  const addNewScheduledAssignment = useCallback(
    async (payload: ScheduledAssignmentsAddPayload) => {
      const resultAction = await dispatch(addScheduledAssignment(payload));
      if (addScheduledAssignment.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    addedScheduledAssignment: data,
    status,
    error,
    addNewScheduledAssignment,
  };
}
