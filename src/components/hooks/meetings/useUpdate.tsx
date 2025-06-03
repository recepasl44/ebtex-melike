import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateMeeting } from "../../../slices/meetings/update/thunk";
import { MeetingUpdatePayload } from "../../../types/meetings/update";

export function useMeetingUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.meetingUpdate
  );

  const updateExistingMeeting = useCallback(
    async (payload: MeetingUpdatePayload) => {
      const resultAction = await dispatch(updateMeeting(payload));
      if (updateMeeting.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedMeeting: data, status, error, updateExistingMeeting };
}
