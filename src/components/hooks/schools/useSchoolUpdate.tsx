import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateSchool } from "../../../slices/schools/update/thunk";
import { ISchoolUpdatePayload } from "../../../types/schools/update";

export function useSchoolUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.schoolUpdate
    );

    const updateExistingSchool = useCallback(
        async (payload: ISchoolUpdatePayload) => {
            const resultAction = await dispatch(updateSchool(payload));
            if (updateSchool.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedSchool: data, status, error, updateExistingSchool };
}
