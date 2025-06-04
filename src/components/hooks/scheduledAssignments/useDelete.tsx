import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteScheduledAssignment } from "../../../slices/scheduledAssignments/delete/thunk";

export function useScheduledAssignmentDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.scheduledAssignmentDelete
  );

  const deleteExistingScheduledAssignment = useCallback(
    async (scheduledAssignmentId: number) => {
      const resultAction = await dispatch(
        deleteScheduledAssignment(scheduledAssignmentId)
      );
      if (deleteScheduledAssignment.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    deletedScheduledAssignment: data,
    status,
    error,
    deleteExistingScheduledAssignment,
  };
}
