import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateGuidanceMeeting } from "../../../slices/guidanceMeeting/update/thunk";
import { GuidanceMeetingsUpdatePayload } from "../../../types/guidanceMeeting/update";

export function useGuidanceMeetingUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guidanceMeetingUpdate
  );

  const updateExistingGuidanceMeeting = useCallback(
    async (payload: GuidanceMeetingsUpdatePayload) => {
      const resultAction = await dispatch(updateGuidanceMeeting(payload));
      if (updateGuidanceMeeting.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    updatedGuidanceMeeting: data,
    status,
    error,
    updateExistingGuidanceMeeting,
  };
}
