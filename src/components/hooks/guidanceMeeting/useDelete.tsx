import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteGuidanceMeeting } from "../../../slices/guidanceMeeting/delete/thunk";

export function useGuidanceMeetingDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guidanceMeetingDelete
  );

  const deleteExistingGuidanceMeeting = useCallback(
    async (meetingId: number) => {
      const resultAction = await dispatch(deleteGuidanceMeeting(meetingId));
      if (deleteGuidanceMeeting.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    deletedGuidanceMeeting: data,
    status,
    error,
    deleteExistingGuidanceMeeting,
  };
}
