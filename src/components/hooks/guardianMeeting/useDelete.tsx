import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteGuardianMeeting } from "../../../slices/guardianMeeting/delete/thunk";

export function useGuardianMeetingDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guardianMeetingDelete
  );

  const deleteExistingGuardianMeeting = useCallback(
    async (meetingId: number) => {
      const resultAction = await dispatch(deleteGuardianMeeting(meetingId));
      if (deleteGuardianMeeting.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    deletedGuardianMeeting: data,
    status,
    error,
    deleteExistingGuardianMeeting,
  };
}
