import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addGuardianMeeting } from "../../../slices/guardianMeeting/add/thunk";
import { GuardianMeetingAddPayload } from "../../../types/guardianMeeting/add";

export function useGuardianMeetingAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guardianMeetingAdd
  );

  const addNewGuardianMeeting = useCallback(
    async (payload: GuardianMeetingAddPayload) => {
      const resultAction = await dispatch(addGuardianMeeting(payload));
      if (addGuardianMeeting.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedGuardianMeeting: data, status, error, addNewGuardianMeeting };
}
