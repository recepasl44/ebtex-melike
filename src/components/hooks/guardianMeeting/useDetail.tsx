import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchGuardianMeeting } from "../../../slices/guardianMeeting/detail/thunk";

export function useGuardianMeetingDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guardianMeetingDetail
  );

  const getGuardianMeeting = useCallback(
    async (meetingId: number) => {
      const resultAction = await dispatch(fetchGuardianMeeting(meetingId));
      if (fetchGuardianMeeting.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { guardianMeeting: data, status, error, getGuardianMeeting };
}
