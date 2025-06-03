import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchGuidanceMeeting } from "../../../slices/guidanceMeeting/detail/thunk";

export function useGuidanceMeetingDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guidanceMeetingDetail
  );

  const getGuidanceMeeting = useCallback(
    async (meetingId: number) => {
      const resultAction = await dispatch(fetchGuidanceMeeting(meetingId));
      if (fetchGuidanceMeeting.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { guidanceMeeting: data, status, error, getGuidanceMeeting };
}
