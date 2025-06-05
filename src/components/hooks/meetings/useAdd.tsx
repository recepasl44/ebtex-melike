import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addMeeting } from "../../../slices/meetings/add/thunk";
import { MeetingAddPayload } from "../../../types/meetings/add";

export function useMeetingAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.meetingAdd
  );

  const addNewMeeting = useCallback(
    async (payload: MeetingAddPayload) => {
      const resultAction = await dispatch(addMeeting(payload));
      if (addMeeting.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedMeeting: data, status, error, addNewMeeting };
}
