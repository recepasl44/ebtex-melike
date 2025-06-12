import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";

import { updateSchoolType } from "../../../slices/schoolTypes/update/thunk";
import { ISchoolTypeUpdatePayload } from "../../../types/schoolTypes/update";

export function useSchoolTypeUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.schoolTypeUpdate
    );

    const updateExistingSchoolType = useCallback(
        async (payload: ISchoolTypeUpdatePayload) => {
            const resultAction = await dispatch(updateSchoolType(payload));
            if (updateSchoolType.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedSchoolType: data, status, error, updateExistingSchoolType };
}
