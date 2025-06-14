import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchMeeting } from "../../../slices/meetings/detail/thunk";

export function useMeetingDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.meetingShow
  );

  const getMeeting = useCallback(
    async (meetingId: number) => {
      const resultAction = await dispatch(fetchMeeting(meetingId));
      if (fetchMeeting.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { meeting: data, status, error, getMeeting };
}
