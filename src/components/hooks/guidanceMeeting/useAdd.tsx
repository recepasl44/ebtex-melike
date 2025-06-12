import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addGuidanceMeeting } from "../../../slices/guidanceMeeting/add/thunk";
import { GuidanceMeetingsAddPayload } from "../../../types/guidanceMeeting/add";

export function useGuidanceMeetingAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guidanceMeetingAdd
  );

  const addNewGuidanceMeeting = useCallback(
    async (payload: GuidanceMeetingsAddPayload) => {
      const resultAction = await dispatch(addGuidanceMeeting(payload));
      if (addGuidanceMeeting.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedGuidanceMeeting: data, status, error, addNewGuidanceMeeting };
}
