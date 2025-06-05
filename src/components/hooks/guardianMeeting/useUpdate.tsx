import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateGuardianMeeting } from "../../../slices/guardianMeeting/update/thunk";
import { GuardianMeetingUpdatePayload } from "../../../types/guardianMeeting/update";

export function useGuardianMeetingUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guardianMeetingUpdate
  );

  const updateExistingGuardianMeeting = useCallback(
    async (payload: GuardianMeetingUpdatePayload) => {
      const resultAction = await dispatch(updateGuardianMeeting(payload));
      if (updateGuardianMeeting.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    updatedGuardianMeeting: data,
    status,
    error,
    updateExistingGuardianMeeting,
  };
}
