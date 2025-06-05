import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteMeeting } from "../../../slices/meetings/delete/thunk";

export function useMeetingDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.meetingDelete
  );

  const deleteExistingMeeting = useCallback(
    async (meetingId: number) => {
      const resultAction = await dispatch(deleteMeeting(meetingId));
      if (deleteMeeting.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedMeeting: data, status, error, deleteExistingMeeting };
}
